'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");

const DocumentSemanticTokensProvider = require("./DocumentSemanticTokensProvider.js").DocumentSemanticTokensProvider
const SemanticTokensLegend = require("./DocumentSemanticTokensProvider.js").SemanticTokensLegend
const DocumentSymbolProvider = require("./DocumentSymbolProvider.js").DocumentSymbolProvider
const HoverProvider = require("./HoverProvider.js").HoverProvider

function nodeToVscodeRange(node) {
	const startPosition = node.startPosition
	const endPosition = node.endPosition

	return new vscode.Range(
		startPosition.row,
		startPosition.column,
		endPosition.row,
		endPosition.column
	)
}


const DocumentSelector = [
	{ language:	'hexagn' }
];
async function activate(context) {
	// vscode.window.showInformationMessage(JSON.stringify())

	const parseTreeExtension = vscode.extensions.getExtension("pokey.parse-tree")
	if (parseTreeExtension == null)
		throw new Error("Depends on pokey.parse-tree extension")
	exports.parseTreeExtension = parseTreeExtension

	const { registerLanguage } = await parseTreeExtension.activate() // functions() {...}; must be async!
	const wasm = context.extensionPath + '\\out\\tree-sitter\\tree-sitter-hexagn.wasm'
	registerLanguage('hexagn', wasm)


	context.subscriptions.push(vscode.languages.registerHoverProvider(DocumentSelector, HoverProvider)) // mouse hovers
	context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(DocumentSelector, DocumentSymbolProvider)) // breadcrumbs
	context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(DocumentSelector, DocumentSemanticTokensProvider, SemanticTokensLegend)) // syntax highlighting
}

exports.nodeToVscodeRange = nodeToVscodeRange

exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;