import * as vscode from "vscode";
import CreateTest from "./lib/CreateTest";
import VSCode from "./lib/vscode/VSCode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "test-generator.generateTest",
    (sourceFile: vscode.Uri) => {
      CreateTest.create(sourceFile.path, new VSCode());
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
