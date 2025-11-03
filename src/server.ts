#!/usr/bin/env node

import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
  CompletionItem,
  CompletionItemKind,
  Hover,
  SignatureHelp,
  SignatureInformation,
  MarkupKind,
} from 'vscode-languageserver/node';

import { TextDocument } from 'vscode-languageserver-textdocument';
import { directives, getAllDirectiveNames } from './directives';
import { extractDirectiveName } from './utils';

const connection = createConnection(ProposedFeatures.all);

const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((params: InitializeParams) => {
  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: true,
        triggerCharacters: ['-'],
      },
      hoverProvider: true,
      signatureHelpProvider: {
        triggerCharacters: ['=', '"', '\''],
        retriggerCharacters: ['"', '\''],
      },
    },
  };
  return result;
});

connection.onInitialized(() => {
  connection.console.log('WordPress Interactivity API LSP Server initialized');
});

function getAttributeAtPosition(document: TextDocument, position: { line: number; character: number }): string | null {
  const line = document.getText({
    start: { line: position.line, character: 0 },
    end: { line: position.line + 1, character: 0 },
  });

  const regex = /data-wp-[a-z-]+(?:--[a-z-]+)?(?:="[^"]*"|='[^']*')?/g;
  let match;

  while ((match = regex.exec(line)) !== null) {
    const start = match.index;
    const end = start + match[0].length;

    if (position.character >= start && position.character <= end) {
      return match[0];
    }
  }

  return null;
}

// hover
connection.onHover((params): Hover | null => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return null;
  }

  const attribute = getAttributeAtPosition(document, params.position);
  if (!attribute) {
    return null;
  }

  const directiveName = extractDirectiveName(attribute);
  if (!directiveName) {
    return null;
  }

  const directive = directives[directiveName];
  if (!directive) {
    return null;
  }

  return {
    contents: {
      kind: MarkupKind.Markdown,
      value: directive.documentation,
    },
  };
});

// completion
connection.onCompletion((params): CompletionItem[] => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return [];
  }

  const line = document.getText({
    start: { line: params.position.line, character: 0 },
    end: { line: params.position.line + 1, character: 0 },
  });

  const beforeCursor = line.substring(0, params.position.character);

  // check if we're in a position to suggest directives
  const match = beforeCursor.match(/(data(?:-[a-z-]*)?)$/);
  if (match) {
    const typedText = match[1];
    const startChar = params.position.character - typedText.length;

    const directiveNames = getAllDirectiveNames();
    return directiveNames.map((name) => {
      const directive = directives[name];
      const fullDirective = `data-${name}`;

      return {
        label: fullDirective,
        kind: CompletionItemKind.Property,
        detail: directive.description,
        documentation: {
          kind: MarkupKind.Markdown,
          value: directive.documentation,
        },
        textEdit: {
          range: {
            start: { line: params.position.line, character: startChar },
            end: { line: params.position.line, character: params.position.character },
          },
          newText: fullDirective,
        },
        filterText: fullDirective,
      };
    });
  }

  return [];
});

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
  return item;
});

// signature
connection.onSignatureHelp((params): SignatureHelp | null => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return null;
  }

  const attribute = getAttributeAtPosition(document, params.position);
  if (!attribute) {
    return null;
  }

  const directiveName = extractDirectiveName(attribute);
  if (!directiveName) {
    return null;
  }

  const directive = directives[directiveName];
  if (!directive) {
    return null;
  }

  const label = `${directive.syntax}`;
  const documentation = `${directive.description}\n\n**Expected Value Type:** ${directive.valueType}\n\n**Examples:**\n${directive.examples.map(ex => `- ${ex}`).join('\n')}`;

  const parameterDoc = `**Type:** ${directive.valueType}\n\n**Examples:**\n${directive.examples.map(ex => `\`${ex}\``).join('\n')}`;

  const signature: SignatureInformation = {
    label,
    documentation: {
      kind: MarkupKind.Markdown,
      value: documentation,
    },
    parameters: [
      {
        label: directive.valueType,
        documentation: {
          kind: MarkupKind.Markdown,
          value: parameterDoc,
        },
      },
    ],
  };

  return {
    signatures: [signature],
    activeSignature: 0,
    activeParameter: 0,
  };
});

// listen on changes
documents.listen(connection);
connection.listen();
