import * as path from "path";
import * as fs from "fs-extra";
import Log from "./Log";
import AbstractVSCode from "./AbstractVSCode";

export default class CreateTest {
  sourceFile: string;
  vscode: AbstractVSCode;

  constructor(sourceFile: string, vscode: AbstractVSCode) {
    this.sourceFile = sourceFile;
    this.vscode = vscode;
  }

  get testPath() {
    const fileDirectory = path.dirname(this.sourceFile);
    const sourceRoot = this.vscode.sourceRoot;
    return path.relative(
      path.resolve(this.vscode.rootPath, sourceRoot!),
      path.resolve(this.vscode.rootPath, fileDirectory)
    );
  }

  get fileName() {
    const extension = path.extname(this.sourceFile);
    const basename = path.basename(this.sourceFile, extension);
    return `${basename}.${this.vscode.fileSuffix}${extension}`;
  }

  get pathName() {
    if (this.vscode.noTestDirectory) {
      return path.resolve(path.dirname(this.sourceFile), this.fileName);
    }

    return path.resolve(
      this.vscode.rootPath,
      this.vscode.testDirectory,
      this.testPath,
      this.fileName
    );
  }

  async makeFile() {
    try {
      await fs.mkdirp(path.dirname(this.pathName));
      if (fs.existsSync(this.pathName)) {
        throw new Error("File already exists");
      }
      await fs.writeFile(this.pathName, "");
      await this.vscode.openFile(this.pathName);
    } catch (e) {
      Log.error(e.message);
      throw e;
    }
  }

  public static create(sourceFile: string, vscode: AbstractVSCode) {
    return new CreateTest(sourceFile, vscode).makeFile();
  }
}
