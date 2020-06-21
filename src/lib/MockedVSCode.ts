import AbstractVSCode from "./AbstractVSCode";

export default class MockedVSCode extends AbstractVSCode {
  root: string;
  suffix: string;
  testDir: string;
  source: string;
  noTestDir: boolean;

  constructor(
    source: string,
    root: string,
    suffix: string,
    testDir: string,
    noTestDir: boolean
  ) {
    super();
    this.source = source;
    this.root = root;
    this.suffix = suffix;
    this.testDir = testDir;
    this.noTestDir = noTestDir;
  }

  get sourceRoot(): string {
    return this.source;
  }
  get rootPath(): string {
    return this.root;
  }
  get fileSuffix(): string {
    return this.suffix;
  }
  get testDirectory(): string {
    return this.testDir;
  }
  get noTestDirectory(): boolean {
    return this.noTestDir;
  }
  openFile = jest.fn();
}
