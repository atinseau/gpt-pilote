import * as vscode from 'vscode';

interface ScriptAsset {
  type?: 'module'
  src: string
  async?: boolean
  defer?: boolean
}

class MainWbProvider {
  private readonly panel: vscode.WebviewPanel;

  private readonly MEDIA_PATH = `${this.context.extensionPath}/media`;

  constructor(private context: vscode.ExtensionContext) {
    this.panel = vscode.window.createWebviewPanel(
      'mainWb',
      'GPT-3',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      },
    );

    this.getWebViewContent();
  }

  private loadCssAssets() {
    const cssAssets = ['/build/style.css'];

    return cssAssets.map((cssAsset) => {
      const cssFile = vscode.Uri.file(`${this.MEDIA_PATH}${cssAsset}`);
      const cssUri = this.panel.webview.asWebviewUri(cssFile);
      return `<link rel="stylesheet" href="${cssUri.toString()}">`;
    }).join('');
  }

  private loadScriptAssets() {
    const scriptAssets: ScriptAsset[] = [
      {
        src: '/build/index.js',
        type: 'module',
        async: true,
      },
    ];

    return scriptAssets.map((scriptAsset) => {
      const scriptFile = vscode.Uri.file(`${this.MEDIA_PATH}${scriptAsset.src}`);
      const scriptUri = this.panel.webview.asWebviewUri(scriptFile);
      return `<script ${scriptAsset.async ? 'async ' : ''}${scriptAsset.defer ? 'defer ' : ''}${scriptAsset.type ? `type=${scriptAsset.type} ` : ''}src="${scriptUri}"></script>`;
    }).join('');
  }

  private async getWebViewContent() {
    const htmlFile = vscode.Uri.file(`${this.MEDIA_PATH}/assets/base.html`);
    const htmlBuffer = await vscode.workspace.fs.readFile(htmlFile);
    const html = Buffer.from(htmlBuffer).toString('utf8');

    console.log(this.loadScriptAssets());

    const htmlWithAssets = html
      .replace('<!-- CSS -->', this.loadCssAssets())
      .replace('<!-- JS -->', this.loadScriptAssets());

    this.panel.webview.html = htmlWithAssets;
  }
}

export default MainWbProvider;
