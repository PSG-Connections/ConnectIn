import { WSDTO } from '../models/chat.model';

export default class WebSocketService {
  url: string;
  ws: WebSocket | null;
  handleIncomingMessages: Function;
  constructor (url: string, handleIncomingMessages: Function) {
    this.ws = null;
    this.url = url;
    this.handleIncomingMessages = handleIncomingMessages;
  }

  onOpenWebSocket () {
    console.log('connection creating ||||||||||||||||||||||||||||||||||||||||||');

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('Connection established with server !!!');
    };

    this.ws.onmessage = (event) => {
      console.log('On message event ->', event);
      this.HandleMessages(event.data);
    };

    this.ws.onerror = (event) => {
      console.log('On error event ->', event);
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  HandleMessages (data: any) {
    console.log('on handle message in the class');
    this.handleIncomingMessages(data);
  }

  sendMessages (data: WSDTO) {
    this.ws?.send(JSON.stringify(data));
  }

  onCloseWebSocket () {
    if (this.ws) {
      this.ws.onclose = () => {
        console.log('Connection closed with server !!!');
      };
    }
  }
}
