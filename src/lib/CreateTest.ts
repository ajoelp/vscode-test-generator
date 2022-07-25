import * as path from "path";
import * as fs from "fs-extra";
import Log from "./Log";
import AbstractVSCode from "./vscode/AbstractVSCode";

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

  get extension() {
    const extension = path.extname(this.sourceFile);
    if (extension === ".vue") {
      return this.vscode.isTypescriptProject ? ".ts" : ".js";
    }
    return extension;
  }

  get basename() {
    const extension = path.extname(this.sourceFile);
    return path.basename(this.sourceFile, extension);
  }

  get fileName() {
    return `${this.basename}.${this.vscode.fileSuffix}${this.extension}`;
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
      await this.vscode.openFile(this.pathName, this.basename);
    } catch (e: any) {
      Log.error(e.message);
      throw e;
    }
  }

  public static create(sourceFile: string, vscode: AbstractVSCode) {
    return new CreateTest(sourceFile, vscode).makeFile();
  }
}
