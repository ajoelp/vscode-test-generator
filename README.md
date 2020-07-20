# Test Generator

Generate test files and directories

![Screenshot](https://raw.githubusercontent.com/ajoelp/vscode-test-generator/master/screenshot.gif)

## Configuration

### Testing Directory

Ex. File needing to be tested at `./src/index.tsx`

```js
{
    "test-generator.sourceRoot": "./src", // Sets the file root source to './src'
    "test-generator.testDirectory": "__tests__", // Outputs the test file in "__tests__/index.spec.tsx",
    "test-generator.fileSuffix": "test", // Outputs the file to "__tests__/index.test.tsx"
    "test-generator.noTestDirectory": true, // Outputs the file to "./src/index.test.tsx",
    "test-generator.testSnippet": [
        "describe('${1:Component}', () => {",
        "})"
    ] // Renders a snippet in the newly created test file. see https://code.visualstudio.com/docs/editor/userdefinedsnippets for documentation on UserSnippets
}
```
