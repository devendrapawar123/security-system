const WS_BASE_URL =
  import.meta.env.VITE_WS_URL ||
  "ws://127.0.0.1:8000/ws";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.reconnectTimer = null;
    this.listeners = [];
  }

  connect(endpoint = "/alerts/") {
    if (
      this.socket &&
      this.socket.readyState === WebSocket.OPEN
    ) {
      return;
    }

    const url = `${WS_BASE_URL}${endpoint}`;

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("✅ WebSocket Connected");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      this.listeners.forEach((listener) =>
        listener(data)
      );
    };

    this.socket.onclose = () => {
      console.log("❌ WebSocket Closed");

      this.reconnectTimer = setTimeout(() => {
        this.connect(endpoint);
      }, 5000);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
      this.socket.close();
    };
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  send(data) {
    if (
      this.socket &&
      this.socket.readyState === WebSocket.OPEN
    ) {
      this.socket.send(JSON.stringify(data));
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);

    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  isConnected() {
    return (
      this.socket &&
      this.socket.readyState === WebSocket.OPEN
    );
  }
}

const websocket = new WebSocketService();

/* Named exports */
export const connectNotifications = (
  callback,
  endpoint = "/notifications/"
) => {
  websocket.connect(endpoint);

  if (callback) {
    return websocket.subscribe(callback);
  }
};

export const disconnectNotifications = () => {
  websocket.disconnect();
};

export const sendNotification = (data) => {
  websocket.send(data);
};

/* Default export */
export default websocket;