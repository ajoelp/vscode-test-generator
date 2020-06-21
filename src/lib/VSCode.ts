import { workspace, Uri, window } from "vscode";
import AbstractVSCode from "./AbstractVSCode";

export default new (class VSCode extends AbstractVSCode {
  get configuration() {
    return workspace.getConfiguration("test-generator");
  }

  get sourceRoot(): string {
    return this.configuration.get<string>("sourceRoot")!;
  }

  get rootPath(): string {
    return workspace.rootPath!;
  }

  get fileSuffix(): string {
    return this.configuration.get<string>("fileSuffix")!;
  }

  get testDirectory(): string {
    return this.configuration.get<string>("testDirectory")!;
  }

  get noTestDirectory(): boolean {
    return this.configuration.get<boolean>("noTestDirectory")!;
  }

  openFile(path: string) {
    window.showTextDocument(Uri.parse(path)).then((err) => {
      if (err) {
        throw err;
      }
      return Promise.resolve();
    });
  }
})();
