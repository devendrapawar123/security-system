import { useCallback } from "react";

import { useWebSocketContext } from "@/context/WebSocketContext";

const useWebSocket = () => {
  const {
    connected,

    notifications,

    securityEvents,

    reconnect,

    clearNotifications,

    clearSecurityEvents,
  } = useWebSocketContext();

  const sendNotification = useCallback((socket, payload) => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(JSON.stringify(payload));
      return true;
    }

    return false;
  }, []);

  const sendSecurityEvent = useCallback((socket, payload) => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(JSON.stringify(payload));
      return true;
    }

    return false;
  }, []);

  const unreadCount = notifications.filter(
    (item) => !item.is_read
  ).length;

  const latestNotification =
    notifications.length > 0
      ? notifications[0]
      : null;

  const latestSecurityEvent =
    securityEvents.length > 0
      ? securityEvents[0]
      : null;

  return {
    connected,

    notifications,

    securityEvents,

    unreadCount,

    latestNotification,

    latestSecurityEvent,

    reconnect,

    clearNotifications,

    clearSecurityEvents,

    sendNotification,

    sendSecurityEvent,
  };
};

export default useWebSocket;