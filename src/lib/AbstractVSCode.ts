abstract class AbstractVSCode {
  abstract get sourceRoot(): string;
  abstract get rootPath(): string;
  abstract get fileSuffix(): string;
  abstract get testDirectory(): string;
  abstract get noTestDirectory(): boolean;
  abstract openFile(path: string): void;
}

export default AbstractVSCode;
