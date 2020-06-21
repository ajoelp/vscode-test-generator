import CreateTest from "../../src/lib/CreateTest";
import { mocked } from 'ts-jest/utils'
import * as fs from 'fs-extra';
import { workspace } from 'vscode';
import MockedVSCode from "../../src/lib/MockedVSCode";
import * as path from 'path'

jest.mock("../../src/lib/Log",() => {
    return {
        error: (error: string) => {
            throw error;
        }
    }
})

const relativePath = (dir: string) => path.resolve(process.cwd(), dir);

describe("CreateTest", () => {
    it('will create a file in a __tests__ directory', async () => {

        const vscode = new MockedVSCode('./src', './', 'spec', '__tests__', false);
        await CreateTest.create('./src/app/file.ts', vscode);
        expect(fs.mkdirp).toHaveBeenCalled()
        expect(fs.existsSync).toHaveBeenCalled()
        expect(fs.writeFile).toHaveBeenCalledWith(relativePath("__tests__/app/file.spec.ts"), "");
        expect(vscode.openFile).toHaveBeenCalledWith(relativePath('__tests__/app/file.spec.ts'))
    });


    it('will create a file in the same directory', async () => {
        const vscode = new MockedVSCode('./src', './', 'spec', '__tests__', true);
        await CreateTest.create('./src/app/file.ts', vscode);
        expect(fs.mkdirp).toHaveBeenCalled()
        expect(fs.existsSync).toHaveBeenCalled()
        expect(fs.writeFile).toHaveBeenCalledWith(relativePath("./src/app/file.spec.ts"), "");
        expect(vscode.openFile).toHaveBeenCalledWith(relativePath('./src/app/file.spec.ts'))
    })

});
