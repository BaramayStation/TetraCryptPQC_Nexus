
/**
 * TetraCryptPQC Communication Failsafe Types
 */

export interface CommunicationImplementation {
  initialize: () => Promise<boolean>;
  sendMessage: (peerId: string, message: string) => Promise<boolean>;
  onMessage: (callback: (from: string, message: string) => void) => void;
  listPeers: () => Promise<string[]>;
  getPeerId: () => Promise<string>;
  disconnect: () => Promise<boolean>;
}

export enum CommunicationMedium {
  WEBSOCKET = "websocket",
  WEBRTC = "webrtc",
  WEBTRANSPORT = "webtransport",
  HTTP = "http",
  SATELLITE = "satellite",
  LORA = "lora",
  RADIO = "radio",
  BLUETOOTH = "bluetooth"
}
