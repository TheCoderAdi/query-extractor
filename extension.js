const vscode = require('vscode');

function extractVariables(sql, ignoreComments = true) {
	let text = sql;

	if (ignoreComments) {
		text = text
			.replace(/--.*?$/gm, '') 
			.replace(/\/\*[\s\S]*?\*\//g, ''); 
	}

	const regex = /(?<!\\)(?:['"])?\$\{\s*([A-Za-z_][A-Za-z0-9_\.]*)\s*\}(?:['"])?/g;
	const found = new Set();

	let match;
	while ((match = regex.exec(text)) !== null) {
		found.add(match[1]);
	}

	return Array.from(found).sort();
}

function activate(context) {
	console.log('Query Extractor is active');

	const disposable = vscode.commands.registerCommand('query-extractor.extractVariables', async function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		const fileName = editor.document.fileName;
		const isSQL = fileName.endsWith('.sql');

		const sql = isSQL
			? editor.document.getText()
			: editor.selection.isEmpty
				? ''
				: editor.document.getText(editor.selection);

		if (!sql.trim()) {
			vscode.window.showInformationMessage("No text selected or file is empty.");
			return;
		}

		const vars = extractVariables(sql, true);

		if (vars.length > 0) {
			const commaSeparated = vars.join(', ');
			await vscode.env.clipboard.writeText(commaSeparated);
			vscode.window.showInformationMessage(`Copied ${vars.length} variables to clipboard`);
		} else {
			vscode.window.showInformationMessage("No variables found.");
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
