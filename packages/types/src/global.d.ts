/// <reference path="./vscode.d.ts" />

declare global {
  interface Message {
    isLocal: boolean
    content: string
    timestamp: string
  }
  interface Conversation {
    messages: Message[]
    date: Date
  }
}

export {};
