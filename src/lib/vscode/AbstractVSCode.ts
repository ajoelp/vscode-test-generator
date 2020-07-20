abstract class AbstractVSCode {
  abstract get sourceRoot(): string;
  abstract get rootPath(): string;
  abstract get fileSuffix(): string;
  abstract get testDirectory(): string;
  abstract get noTestDirectory(): boolean;
  abstract get testSnippet(): string[];
  abstract openFile(path: string, basename: string): void;

  get isTypescriptProject(): boolean {
    return false;
  }
}

export default AbstractVSCode;
