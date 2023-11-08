declare module 'viber-bot' {
  export class Bot {
    constructor({ authToken: string, name: string, avatar: string });
    on(event: string, callback: Function): this;
    onTextMessage(regExp: RegExp, callback: Function): this;
    middleware(): RequestListener<typeof IncomingMessage, typeof ServerResponse> | undefined;
    setWebhook(url: string): Promise<unknown>;
    sendMessage(userProfile: UserProfile, message: Message.Text): Promise<void>;
  }

  export class UserProfile { //TODO clarify correct type
    constructor(id: string, name: string, avatar: string);
    public static fromJson(json: unknown): UserProfile;
  }

  export namespace Message {
    export class Text { //TODO clarify correct type
      constructor(text: string);
      public static fromJson(json: unknown): TextMessage;
      public getType(): string;
    }

    export class Url { //TODO clarify correct type
      constructor(url: string);
      public static fromJson(json: unknown): UrlMessage;
      public getType(): string;
    }

    export class Contact { //TODO clarify correct type
      constructor(name: string, phoneNumber: string);
      public static fromJson(json: unknown): ContactMessage;
      public getType(): string;
    }

    export class File { //TODO clarify correct type
      constructor(media: string);
      public static fromJson(json: unknown): FileMessage;
      public getType(): string;
    }

    export class Location { //TODO clarify correct type
      constructor(location: unknown);
      public static fromJson(json: unknown): LocationMessage;
      public getType(): string;
    }

    export class Picture { //TODO clarify correct type
      constructor(url: string, text: string);
      public static fromJson(json: unknown): PictureMessage;
      public getType(): string;
    }

    export class Video {
      constructor(url: string); //TODO clarify correct type
      public static fromJson(json: unknown): VideoMessage;
      public getType(): string;
    }

    export class Sticker { //TODO clarify correct type
      constructor(stickerId: number);
      public static fromJson(json: unknown): StickerMessage;
      public getType(): string;
    }

    export class RichMedia { //TODO clarify correct type
      constructor(richMedia: unknown);
      public static fromJson(json: unknown): RichMediaMessage;
      public getType(): string;
    }

    export class Keyboard { //TODO clarify correct type
      constructor(keyboard: unknown);
      public static fromJson(json: unknown): KeyboardMessage;
      public getType(): string;
    }
  }

  type TextMessage = {
    text: string;
    timestamp: number;
    token: string;
    trackingData: Record<string, unknown>;
    keyboard: null | unknown;
    requiredArguments: string[];
    minApiVersion: number | undefined;
  }

  export namespace Events {
    export const MESSAGE_RECEIVED: string;
    export const MESSAGE_SENT: string;
    export const SUBSCRIBED: string;
    export const UNSUBSCRIBED: string;
    export const CONVERSATION_STARTED: string;
    export const ERROR: string;
    export const FAILED: string;
  }

  export type MessageEvents = typeof Events;

  export type ViberResponse = {
    authToken: string;
    name: string;
    avatar: string;
  
    userProfile: {
      id: string;
      name: string;
      avatar: string;
      country: string;
      language: string;
      apiVersion: number;
    };

    silent: boolean;
    replyType?: unknown;
    chatId?: number | string;
    send: <T, M>(T, M?) => Promise<unknown>;
  }
}