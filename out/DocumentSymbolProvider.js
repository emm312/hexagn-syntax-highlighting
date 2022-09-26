const vscode = require("vscode")
const extension = require("./extension.js")

// const SymbolKind = {
// 	// 'File': vscode.SymbolKind.File,
// 	// 'Module': vscode.SymbolKind.Module,
// 	// 'Namespace': vscode.SymbolKind.Namespace,
// 	// 'Package': vscode.SymbolKind.Package,
// 	// 'Class': vscode.SymbolKind.Class,
// 	// 'Method': vscode.SymbolKind.Method,
// 	// 'Property': vscode.SymbolKind.Property,
// 	// 'Field': vscode.SymbolKind.Field,
// 	// 'Constructor': vscode.SymbolKind.Constructor,
// 	// 'Enum': vscode.SymbolKind.Enum,
// 	// 'Interface': vscode.SymbolKind.Interface,
// 	// 'Function': vscode.SymbolKind.Function,
// 	// 'Variable': vscode.SymbolKind.Variable,
// 	// 'Constant': vscode.SymbolKind.Constant,
// 	// 'String': vscode.SymbolKind.String,
// 	// 'Number': vscode.SymbolKind.Number,
// 	// 'Boolean': vscode.SymbolKind.Boolean,
// 	// 'Array': vscode.SymbolKind.Array,
// 	// 'Object': vscode.SymbolKind.Object,
// 	// 'Key': vscode.SymbolKind.String,
// 	// 'Null': vscode.SymbolKind.Null,
// 	// 'EnumMember': vscode.SymbolKind.EnumMember,
// 	// 'Struct': vscode.SymbolKind.Struct,
// 	// 'Event': vscode.SymbolKind.Event,
// 	// 'Operator': vscode.SymbolKind.Operator,
// 	// 'TypeParameter': vscode.SymbolKind.TypeParameter,
	
// 	'instruction': vscode.SymbolKind.Function,
// 	'identifier': vscode.SymbolKind.Key,
// 	'comment': vscode.SymbolKind.String,
	
// 	'repository': vscode.SymbolKind.Object,
// 	'repo': vscode.SymbolKind.Function,
	
// 	'captures': vscode.SymbolKind.Field,
// 	'beginCaptures': vscode.SymbolKind.Field,
// 	'endCaptures': vscode.SymbolKind.Field,
// 	'capture': vscode.SymbolKind.Number,
	
// 	'match': vscode.SymbolKind.String,
// 	'begin': vscode.SymbolKind.String,
// 	'end': vscode.SymbolKind.String,
// 	'while': vscode.SymbolKind.String,
	
// 	'scopeName': vscode.SymbolKind.String,
// 	'nameScope': vscode.SymbolKind.String,
// 	'name': vscode.SymbolKind.String,
	
// 	'injectionSelector': vscode.SymbolKind.String,
// 	'injections': vscode.SymbolKind.Object,
// 	'injection': vscode.SymbolKind.Number,
	
// 	'include': vscode.SymbolKind.Variable,
// 	'comment': vscode.SymbolKind.String,
	
// 	'object': vscode.SymbolKind.Object,
// 	'array': vscode.SymbolKind.Array,
// 	'item': vscode.SymbolKind.String,
// 	'value': vscode.SymbolKind.Key,
// 	'key': vscode.SymbolKind.Property,
	
// 	'{': vscode.SymbolKind.Object,
// 	'}': vscode.SymbolKind.Object,
// 	'[': vscode.SymbolKind.Array,
// 	']': vscode.SymbolKind.Array,
// 	',': vscode.SymbolKind.Property,
// 	':': vscode.SymbolKind.Property,
// 	'"': vscode.SymbolKind.Property,
// }

const DocumentSymbolProvider = {
	async provideDocumentSymbols(document) {

		const { getTree } = await extension.parseTreeExtension.activate()

		const tree = getTree(document)
		const symbols = []

		this.getAllChildren(tree.rootNode, symbols)

		// vscode.window.showInformationMessage(JSON.stringify(symbols))
		return symbols
	},
	async getAllChildren(node, symbols) {
		// vscode.window.showInformationMessage(JSON.stringify(node.type))

		const symbolsChildren = []


		if (false)
			for (let index = 0; index < node.namedChildCount; index++)
				this.getAllChildren(node.namedChild(index), symbolsChildren)
		else
			for (let index = 0; index < node.childCount; index++)
				this.getAllChildren(node.child(index), symbolsChildren)


		const range = extension.nodeToVscodeRange(node)
		const documentSymbol = new vscode.DocumentSymbol(
			node.type ? node.type : 'null',
			node.text,
			node.isNamed() ? vscode.SymbolKind.Function : vscode.SymbolKind.Field,
			range,
			range
		)

		documentSymbol.children = symbolsChildren
		symbols.push(documentSymbol)
	}
}

exports.DocumentSymbolProvider = DocumentSymbolProvider