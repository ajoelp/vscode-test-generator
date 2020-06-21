# Test Generator

Generate test files and directories

![Screenshot](https://raw.githubusercontent.com/ajoelp/vscode-test-generator/master/screenshot.gif)

## Configuration

### Testing Directory

Ex. File needing to be tested at `./src/index.tsx`

```json
{
    "test-generator.sourceRoot": "./src", // Sets the file root source to './src'
    "test-generator.testDirectory": "tests", // Outputs the test file in "__tests__/index.spec.tsx",
    "test-generator.fileSuffix": "test", // Outputs the file to "__tests__/index.test.tsx"
    "test-generator.noTestDirectory": true, // Outputs the file to "./src/index.test.tsx"
}
```

## Todos
- [ ] Support different languages
- [ ] Template generation
