const vscode = require("vscode")
const extension = require("./extension.js")




// const HoverWords = [
//     {
//         symbol: "int8",
//         description: "8-bit signed integer",
//         example: "int8 x = 1;"
//     },
//     {
//         symbol: "int16",
//         description: "16-bit signed integer",
//         example: "int16 x = 1;"
//     },
//     {
//         symbol: "int32",
//         description: "32-bit signed integer",
//         example: "int32 x = 1;"
//     },
//     {
//         symbol: "uint8",
//         description: "8-bit unsigned integer",
//         example: "uint8 x = 1;"
//     },
//     {
//         symbol: "uint16",
//         description: "16-bit unsigned integer",
//         example: "uint16 x = 1;"
//     },
//     {
//         symbol: "uint32",
//         description: "32-bit unsigned integer",
//         example: "uint32 x = 1;"
//     },
//     {
//         symbol: "string",
//         description: "string",
//         example: "string x = \"Hello World\";"
//     },
//     {
//         symbol: "char",
//         description: "character",
//         example: "char x = 'a';"
//     },
//     {
//         symbol: "import",
//         description: "imports a library",
//         example: "import io;"
//     },
//     {
//         symbol: "if",
//         description: "if statement",
//         example: "if (i == 0) {"
//     },
//     {
//         symbol: "while",
//         description: "while loop",
//         example: "while (i < 10) {"
//     }

// ]

// const hoverProvider = {
//     provideHover(document, position, token) {
//         const wordRange = document.getWordRangeAtPosition(position);
//         if (!wordRange) {
//             return undefined;
//         }
//         const word = document.getText(wordRange);
//         const hover = HoverWords.find(w => w.symbol === word);
//         if (!hover) {
//             return undefined;
//         }
//         const markdownString = new vscode.MarkdownString();
//         markdownString.appendText(hover.description);
//         markdownString.appendCodeblock(hover.example, 'hexagn');
//         return new vscode.Hover(markdownString, wordRange);
//     }
// }



const HoverProvider = {
	async provideHover(document, position, token) {
		
		const { getNodeAtLocation } = await extension.parseTreeExtension.activate()

		const location = new vscode.Location(document.uri, position)
		let node = getNodeAtLocation(location)

		var markdownString = new vscode.MarkdownString()
		
		markdownString.appendCodeblock(node.text, 'hexagn')
		
		if (node.parent != null)
			markdownString.appendText(node.parent.type + ' => ')
		markdownString.appendText(node.type)
		
		// can add multiple hovers with `markdownString.appendCodeblock()`

		const range = extension.nodeToVscodeRange(node)
		const hover = new vscode.Hover(markdownString, range)
		return hover
	}
}


exports.HoverProvider = HoverProvider