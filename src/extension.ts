// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import MainWbProvider from './Provider/MainWbProvider';

// const dialog = async (message: string) => {
//   const inputBox = vscode.window.createInputBox();
//   inputBox.title = 'GPT-3';
//   inputBox.placeholder = message;
//   inputBox.show();

//   const value = await new Promise<string>((resolve) => {
//     inputBox.onDidAccept(() => {
//       resolve(inputBox.value);
//     });
//   });
//   inputBox.dispose();
//   return value;
// };

// const registerPromptCommand = (context: vscode.ExtensionContext) => {
//   // add command
//   const startChat = vscode.commands.registerCommand('gpt-pilote.startChat', async () => {
//     while (true) {
//       const message = await dialog('Ask me anything');
//       if (!message) {
//         break;
//       }
//       console.log(message);
//     }
//   });

//   context.subscriptions.push(startChat);
// };

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mainWbProvider = new MainWbProvider(context);
}

// This method is called when your extension is deactivated
export function deactivate() { }
