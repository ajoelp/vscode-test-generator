import { window } from "vscode";

export default new (class Log {
  info(message: string) {
    window.showInformationMessage(message);
  }
  error(message: string) {
    window.showErrorMessage(message);
  }
})();
