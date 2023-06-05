export interface GreenApiState {
  instanceId: string;
  token: string;
  chatList: ChatInfo[];
  notifications: Notification[];
  messageHistory: MessageHistory;
}

export interface MessageHistory {
  [key: string]: Message[];
}

export interface ChatInfo {
//   archive: boolean;
  id: string;
//   notSpam: boolean;
//   ephemeralExpiration: number;
//   ephemeralSettingTimestamp: number;
//   name?: string;
}

export interface Notification {
  typeWebhook: string;
  instanceData: InstanceData;
  timestamp: number;
  idMessage: string;
  senderData: SenderData;
  messageData: MessageData;
}

export interface InstanceData {
  idInstance: number;
  wid: string;
  typeInstance: string;
}

export interface SenderData {
  chatId: string;
  sender: string;
  chatName: string;
  senderName: string;
}

export interface MessageData {
  typeMessage: string;
  textMessageData: TextMessageData;
  quotedMessage: QuotedMessage;
}

export interface TextMessageData {
  textMessage: string;
  isTemplateMessage: boolean;
}

export interface QuotedMessage {
  stanzaId: string;
  participant: string;
  typeMessage: string;
}

export interface Message {
  chatId: string;
  idMessage: string;
  sendByApi: boolean;
  statusMessage?: string;
  textMessage: string;
  timestamp: number;
  type: string;
  typeMessage: string;
}
