declare global {
  type VSCode = {
    postMessage(message: any): void;
    getState(): any;
    setState(state: any): void;
  };
  const acquireVsCodeApi: () => VSCode;
}

export {};
