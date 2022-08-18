'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");

const HoverWords = [
    {
        symbol: "int8",
        description: "8-bit signed integer",
        example: "int8 x = 1;"
    },
    {
        symbol: "int16",
        description: "16-bit signed integer",
        example: "int16 x = 1;"
    },
    {
        symbol: "int32",
        description: "32-bit signed integer",
        example: "int32 x = 1;"
    },
    {
        symbol: "uint8",
        description: "8-bit unsigned integer",
        example: "uint8 x = 1;"
    },
    {
        symbol: "uint16",
        description: "16-bit unsigned integer",
        example: "uint16 x = 1;"
    },
    {
        symbol: "uint32",
        description: "32-bit unsigned integer",
        example: "uint32 x = 1;"
    },
    {
        symbol: "string",
        description: "string",
        example: "string x = \"Hello World\";"
    },
    {
        symbol: "char",
        description: "character",
        example: "char x = 'a';"
    },
    {
        symbol: "import",
        description: "imports a library",
        example: "import io;"
    },

]

const hoverProvider = {
    provideHover(document, position, token) {
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return undefined;
        }
        const word = document.getText(wordRange);
        const hover = HoverWords.find(w => w.symbol === word);
        if (!hover) {
            return undefined;
        }
        return new vscode.Hover(hover.description, new vscode.MarkdownString(hover.example));
    }
}

const fileSelector = [
	{ language:	'hexagn' }
];


function activate(context) {
    context.subscriptions.push(vscode.languages.registerHoverProvider('hexagn', hoverProvider));
}


exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;