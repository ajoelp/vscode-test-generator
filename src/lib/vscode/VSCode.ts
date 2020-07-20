import { workspace, Uri, window, SnippetString, TextEditor } from "vscode";
import * as fs from "fs";
import * as path from "path";
import AbstractVSCode from "./AbstractVSCode";

export default class VSCode extends AbstractVSCode {
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

  get testSnippet(): string[] {
    return this.configuration.get<string[]>("testSnippet")!;
  }

  get isTypescriptProject(): boolean {
    return fs.existsSync(path.resolve(this.rootPath, "tsconfig.json"));
  }

  openFile(filePath: string, basename: string) {
    return window.showTextDocument(Uri.parse(filePath)).then(
      (editor) => {
        this.insertSnippet(editor, basename);
      },
      (error) => Promise.reject(error)
    );
  }

  insertSnippet(editor: TextEditor, componentName: string) {
    if (!this.testSnippet || !this.testSnippet.length) {
      return;
    }

    const snippet = new SnippetString(
      this.testSnippet.join("\n").replace("FILENAME", componentName)
    );

    editor.insertSnippet(snippet, editor.selection);
  }
}
