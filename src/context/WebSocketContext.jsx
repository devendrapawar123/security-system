import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  connectNotifications,
  connectSecurity,
} from "@/api/websocket";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const notificationSocket = useRef(null);
  const securitySocket = useRef(null);

  const [connected, setConnected] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [securityEvents, setSecurityEvents] = useState([]);

  useEffect(() => {
    connectSockets();

    return () => {
      disconnectSockets();
    };
  }, []);

  const connectSockets = () => {
    notificationSocket.current =
      connectNotifications(handleNotification);

    securitySocket.current =
      connectSecurity(handleSecurityEvent);

    setConnected(true);
  };

  const disconnectSockets = () => {
    notificationSocket.current?.close?.();
    securitySocket.current?.close?.();

    setConnected(false);
  };

  const reconnect = () => {
    disconnectSockets();

    setTimeout(() => {
      connectSockets();
    }, 1000);
  };

  const handleNotification = (data) => {
    setNotifications((prev) => [
      data,
      ...prev,
    ]);
  };

  const handleSecurityEvent = (data) => {
    setSecurityEvents((prev) => [
      data,
      ...prev,
    ]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const clearSecurityEvents = () => {
    setSecurityEvents([]);
  };

  const value = {
    connected,

    notifications,

    securityEvents,

    reconnect,

    clearNotifications,

    clearSecurityEvents,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () =>
  useContext(WebSocketContext);import { useCallback, useRef } from "react";

const reconnectTimeoutRef = useRef(null);
const heartbeatRef = useRef(null);

const MAX_RECONNECT_ATTEMPTS = 10;
const HEARTBEAT_INTERVAL = 30000;

const reconnectAttempts = useRef(0);

const startHeartbeat = useCallback(() => {
  stopHeartbeat();

  heartbeatRef.current = setInterval(() => {
    try {
      notificationSocket.current?.send?.(
        JSON.stringify({
          type: "ping",
        })
      );

      securitySocket.current?.send?.(
        JSON.stringify({
          type: "ping",
        })
      );
    } catch (error) {
      console.error("Heartbeat failed", error);
    }
  }, HEARTBEAT_INTERVAL);
}, []);

const stopHeartbeat = useCallback(() => {
  if (heartbeatRef.current) {
    clearInterval(heartbeatRef.current);
    heartbeatRef.current = null;
  }
}, []);

const scheduleReconnect = useCallback(() => {
  if (
    reconnectAttempts.current >=
    MAX_RECONNECT_ATTEMPTS
  ) {
    console.warn(
      "Maximum reconnect attempts reached."
    );
    return;
  }

  reconnectAttempts.current += 1;

  const delay = Math.min(
    reconnectAttempts.current * 2000,
    15000
  );

  reconnectTimeoutRef.current = setTimeout(() => {
    reconnect();
  }, delay);
}, []);

const attachSocketEvents = useCallback(() => {
  if (notificationSocket.current) {
    notificationSocket.current.onopen = () => {
      setConnected(true);
      reconnectAttempts.current = 0;
      startHeartbeat();
    };

    notificationSocket.current.onerror = (error) => {
      console.error(
        "Notification socket error",
        error
      );
    };

    notificationSocket.current.onclose = () => {
      setConnected(false);
      stopHeartbeat();
      scheduleReconnect();
    };
  }

  if (securitySocket.current) {
    securitySocket.current.onopen = () => {
      setConnected(true);
    };

    securitySocket.current.onerror = (error) => {
      console.error(
        "Security socket error",
        error
      );
    };

    securitySocket.current.onclose = () => {
      setConnected(false);
      stopHeartbeat();
      scheduleReconnect();
    };
  }
}, [
  scheduleReconnect,
  startHeartbeat,
  stopHeartbeat,
]);

const connectSockets = useCallback(() => {
  notificationSocket.current =
    connectNotifications(handleNotification);

  securitySocket.current =
    connectSecurity(handleSecurityEvent);

  attachSocketEvents();
}, [attachSocketEvents]);

useEffect(() => {
  connectSockets();

  return () => {
    stopHeartbeat();

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    disconnectSockets();
  };
}, [connectSockets, stopHeartbeat]);