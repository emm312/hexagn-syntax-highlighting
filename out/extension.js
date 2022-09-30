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

	


	context.subscriptions.push(vscode.languages.registerHoverProvider(DocumentSelector, HoverProvider)) // mouse hovers
	context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(DocumentSelector, DocumentSymbolProvider)) // breadcrumbsW
}

exports.nodeToVscodeRange = nodeToVscodeRange

exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;