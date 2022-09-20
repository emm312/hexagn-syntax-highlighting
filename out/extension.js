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
    {
        symbol: "if",
        description: "if statement",
        example: "if (i == 0) {"
    },
    {
        symbol: "while",
        description: "while loop",
        example: "while (i < 10) {"
    }

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
        const markdownString = new vscode.MarkdownString();
        markdownString.appendText(hover.description);
        markdownString.appendCodeblock(hover.example, 'hexagn');
        return new vscode.Hover(markdownString, wordRange);
    }
}


/*
const SematicTok = {
    provideDocumentSemanticTokens(document) {
        const tokensBuilder = new vscode.SemanticTokensBuilder();
        const varRegex = /((u?int(8|16|32))|(string|char)) [^; *=()]*//*g;
        const varMatchesWithType = document.getText().match(varRegex);
        varMatches = [];
        varMatchesWithType.forEach(match => {
            varMatches.push(match.split(" ")[1]);
        });
        if (varMatchesWithType) {
            for (const match of varMatches) {
                console.log(match);
                const start = document.getText().indexOf(match);
                const end = start + match.length;
                tokensBuilder.push(start, end, "variable");
            }
        }
        return tokensBuilder.build();
    }
}

*/
const fileSelector = [
	{ language:	'hexagn' }
];
function activate(context) {
    context.subscriptions.push(vscode.languages.registerHoverProvider('hexagn', hoverProvider));
}


exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;