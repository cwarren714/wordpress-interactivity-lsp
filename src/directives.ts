export interface DirectiveDefinition {
  name: string;
  syntax: string;
  description: string;
  details?: string;
  valueType: string;
  examples: string[];
  documentation: string;
}

export const directives: Record<string, DirectiveDefinition> = {
  'wp-interactive': {
    name: 'wp-interactive',
    syntax: 'data-wp-interactive="namespace" or data-wp-interactive=\'{ "namespace": "name" }\'',
    description: '"Activates" interactivity for an element and its children through the Interactivity API',
    details: 'Sets a namespace to reference a specific store; required for the API engine to function',
    valueType: 'string | { namespace: string }',
    examples: [
      'data-wp-interactive="myPlugin"',
      'data-wp-interactive=\'{ "namespace": "myPlugin" }\''
    ],
    documentation: '**wp-interactive**\n\nActivates interactivity for an element and its children through the Interactivity API. Sets a namespace to reference a specific store; required for the API engine to function.\n\n**Syntax:** `data-wp-interactive="namespace"` or `data-wp-interactive=\'{ "namespace": "name" }\'`\n\n**Value Type:** string | { namespace: string }\n\n**Examples:**\n```html\ndata-wp-interactive="myPlugin"\ndata-wp-interactive=\'{ "namespace": "myPlugin" }\'\n```'
  },
  'wp-context': {
    name: 'wp-context',
    syntax: 'data-wp-context=\'{ "key": value }\'',
    description: 'Provides local state available to a specific HTML node and its descendants',
    details: 'Accepts stringified JSON; deeper context levels merge with parent contexts',
    valueType: 'JSON object',
    examples: [
      'data-wp-context=\'{ "isOpen": false }\'',
      'data-wp-context=\'{ "currentPage": 1, "total": 10 }\''
    ],
    documentation: '**wp-context**\n\nProvides local state available to a specific HTML node and its descendants. Accepts stringified JSON; deeper context levels merge with parent contexts.\n\n**Syntax:** `data-wp-context=\'{ "key": value }\'`\n\n**Value Type:** JSON object\n\n**Examples:**\n```html\ndata-wp-context=\'{ "isOpen": false }\'\ndata-wp-context=\'{ "currentPage": 1, "total": 10 }\'\n```'
  },
  'wp-bind': {
    name: 'wp-bind',
    syntax: 'data-wp-bind--attribute="expression"',
    description: 'Sets HTML attributes based on boolean or string values',
    details: 'true = attribute added; false = attribute removed. String values assign as attribute value. Boolean aria-/data- attributes render as string values. Updates when referenced state/context properties change.',
    valueType: 'boolean | string expression',
    examples: [
      'data-wp-bind--hidden="state.isHidden"',
      'data-wp-bind--aria-label="state.label"',
      'data-wp-bind--src="context.imageUrl"'
    ],
    documentation: '**wp-bind**\n\nSets HTML attributes based on boolean or string values. Updates reactively when referenced state/context properties change.\n\n**Syntax:** `data-wp-bind--attribute="expression"`\n\n**Value Type:** boolean | string expression\n\n**Key Behaviors:**\n- `true` = attribute added; `false` = attribute removed\n- String values assign as attribute value\n- Boolean aria-/data- attributes render as string values\n\n**Examples:**\n```html\ndata-wp-bind--hidden="state.isHidden"\ndata-wp-bind--aria-label="state.label"\ndata-wp-bind--src="context.imageUrl"\n```'
  },
  'wp-class': {
    name: 'wp-class',
    syntax: 'data-wp-class--classname="expression"',
    description: 'Adds or removes CSS classes based on boolean values',
    details: 'Use kebab-case for class names; toggles on true/false',
    valueType: 'boolean expression',
    examples: [
      'data-wp-class--active="state.isActive"',
      'data-wp-class--is-open="context.menuOpen"',
      'data-wp-class--hidden="!state.visible"'
    ],
    documentation: '**wp-class**\n\nAdds or removes CSS classes based on boolean values. Use kebab-case for class names; toggles on true/false.\n\n**Syntax:** `data-wp-class--classname="expression"`\n\n**Value Type:** boolean expression\n\n**Examples:**\n```html\ndata-wp-class--active="state.isActive"\ndata-wp-class--is-open="context.menuOpen"\ndata-wp-class--hidden="!state.visible"\n```'
  },
  'wp-style': {
    name: 'wp-style',
    syntax: 'data-wp-style--property="expression"',
    description: 'Dynamically applies inline CSS styles',
    details: 'Reacts to state/context changes',
    valueType: 'string expression',
    examples: [
      'data-wp-style--background-color="state.color"',
      'data-wp-style--display="context.isVisible ? \'block\' : \'none\'"',
      'data-wp-style--opacity="state.opacity"'
    ],
    documentation: '**wp-style**\n\nDynamically applies inline CSS styles. Reacts to state/context changes.\n\n**Syntax:** `data-wp-style--property="expression"`\n\n**Value Type:** string expression\n\n**Examples:**\n```html\ndata-wp-style--background-color="state.color"\ndata-wp-style--display="context.isVisible ? \'block\' : \'none\'"\ndata-wp-style--opacity="state.opacity"\n```'
  },
  'wp-text': {
    name: 'wp-text',
    syntax: 'data-wp-text="expression"',
    description: 'Sets element text content based on expressions',
    details: 'Updates reactively when referenced values change',
    valueType: 'string expression',
    examples: [
      'data-wp-text="state.message"',
      'data-wp-text="context.userName"',
      'data-wp-text="state.count + \' items\'"'
    ],
    documentation: '**wp-text**\n\nSets element text content based on expressions. Updates reactively when referenced values change.\n\n**Syntax:** `data-wp-text="expression"`\n\n**Value Type:** string expression\n\n**Examples:**\n```html\ndata-wp-text="state.message"\ndata-wp-text="context.userName"\ndata-wp-text="state.count + \' items\'"\n```'
  },
  'wp-on': {
    name: 'wp-on',
    syntax: 'data-wp-on--event="actions.handler"',
    description: 'Attaches event listeners (synchronous)',
    details: 'Handles events like click, input, change synchronously',
    valueType: 'actions.handlerName',
    examples: [
      'data-wp-on--click="actions.handleClick"',
      'data-wp-on--input="actions.handleInput"',
      'data-wp-on--change="actions.handleChange"'
    ],
    documentation: '**wp-on**\n\nAttaches event listeners (synchronous). Handles events like click, input, change synchronously.\n\n**Syntax:** `data-wp-on--event="actions.handler"`\n\n**Value Type:** actions.handlerName\n\n**Examples:**\n```html\ndata-wp-on--click="actions.handleClick"\ndata-wp-on--input="actions.handleInput"\ndata-wp-on--change="actions.handleChange"\n```'
  },
  'wp-on-async': {
    name: 'wp-on-async',
    syntax: 'data-wp-on-async--event="actions.handler"',
    description: 'Attaches asynchronous event listeners',
    details: 'Non-blocking event handling',
    valueType: 'actions.handlerName',
    examples: [
      'data-wp-on-async--click="actions.fetchData"',
      'data-wp-on-async--submit="actions.submitForm"'
    ],
    documentation: '**wp-on-async**\n\nAttaches asynchronous event listeners. Non-blocking event handling.\n\n**Syntax:** `data-wp-on-async--event="actions.handler"`\n\n**Value Type:** actions.handlerName\n\n**Examples:**\n```html\ndata-wp-on-async--click="actions.fetchData"\ndata-wp-on-async--submit="actions.submitForm"\n```'
  },
  'wp-on-window': {
    name: 'wp-on-window',
    syntax: 'data-wp-on-window--event="actions.handler"',
    description: 'Listens to window events synchronously',
    valueType: 'actions.handlerName',
    examples: [
      'data-wp-on-window--resize="actions.handleResize"',
      'data-wp-on-window--scroll="actions.handleScroll"'
    ],
    documentation: '**wp-on-window**\n\nListens to window events synchronously.\n\n**Syntax:** `data-wp-on-window--event="actions.handler"`\n\n**Value Type:** actions.handlerName\n\n**Examples:**\n```html\ndata-wp-on-window--resize="actions.handleResize"\ndata-wp-on-window--scroll="actions.handleScroll"\n```'
  },
  'wp-on-async-window': {
    name: 'wp-on-async-window',
    syntax: 'data-wp-on-async-window--event="actions.handler"',
    description: 'Listens to window events asynchronously',
    valueType: 'actions.handlerName',
    examples: [
      'data-wp-on-async-window--load="actions.initialize"',
      'data-wp-on-async-window--resize="actions.updateLayout"'
    ],
    documentation: '**wp-on-async-window**\n\nListens to window events asynchronously.\n\n**Syntax:** `data-wp-on-async-window--event="actions.handler"`\n\n**Value Type:** actions.handlerName\n\n**Examples:**\n```html\ndata-wp-on-async-window--load="actions.initialize"\ndata-wp-on-async-window--resize="actions.updateLayout"\n```'
  },
  'wp-on-document': {
    name: 'wp-on-document',
    syntax: 'data-wp-on-document--event="actions.handler"',
    description: 'Listens to document events synchronously',
    valueType: 'actions.handlerName',
    examples: [
      'data-wp-on-document--click="actions.handleDocumentClick"',
      'data-wp-on-document--keydown="actions.handleKeyPress"'
    ],
    documentation: '**wp-on-document**\n\nListens to document events synchronously.\n\n**Syntax:** `data-wp-on-document--event="actions.handler"`\n\n**Value Type:** actions.handlerName\n\n**Examples:**\n```html\ndata-wp-on-document--click="actions.handleDocumentClick"\ndata-wp-on-document--keydown="actions.handleKeyPress"\n```'
  },
  'wp-on-async-document': {
    name: 'wp-on-async-document',
    syntax: 'data-wp-on-async-document--event="actions.handler"',
    description: 'Listens to document events asynchronously',
    valueType: 'actions.handlerName',
    examples: [
      'data-wp-on-async-document--DOMContentLoaded="actions.init"',
      'data-wp-on-async-document--visibilitychange="actions.handleVisibility"'
    ],
    documentation: '**wp-on-async-document**\n\nListens to document events asynchronously.\n\n**Syntax:** `data-wp-on-async-document--event="actions.handler"`\n\n**Value Type:** actions.handlerName\n\n**Examples:**\n```html\ndata-wp-on-async-document--DOMContentLoaded="actions.init"\ndata-wp-on-async-document--visibilitychange="actions.handleVisibility"\n```'
  },
  'wp-watch': {
    name: 'wp-watch',
    syntax: 'data-wp-watch="callbacks.handler"',
    description: 'Triggers side effects when specific state/context properties change',
    details: 'Monitors specified dependencies',
    valueType: 'callbacks.handlerName',
    examples: [
      'data-wp-watch="callbacks.logStateChanges"',
      'data-wp-watch="callbacks.syncWithServer"'
    ],
    documentation: '**wp-watch**\n\nTriggers side effects when specific state/context properties change. Monitors specified dependencies.\n\n**Syntax:** `data-wp-watch="callbacks.handler"`\n\n**Value Type:** callbacks.handlerName\n\n**Examples:**\n```html\ndata-wp-watch="callbacks.logStateChanges"\ndata-wp-watch="callbacks.syncWithServer"\n```'
  },
  'wp-init': {
    name: 'wp-init',
    syntax: 'data-wp-init="actions.handler"',
    description: 'Executes action when element is first created',
    valueType: 'actions.handlerName',
    examples: [
      'data-wp-init="actions.initialize"',
      'data-wp-init="actions.setup"'
    ],
    documentation: '**wp-init**\n\nExecutes action when element is first created.\n\n**Syntax:** `data-wp-init="actions.handler"`\n\n**Value Type:** actions.handlerName\n\n**Examples:**\n```html\ndata-wp-init="actions.initialize"\ndata-wp-init="actions.setup"\n```'
  },
  'wp-run': {
    name: 'wp-run',
    syntax: 'data-wp-run="callbacks.handler"',
    description: 'Runs code during element initialization or lifecycle',
    valueType: 'callbacks.handlerName',
    examples: [
      'data-wp-run="callbacks.setup"',
      'data-wp-run="callbacks.initializeComponent"'
    ],
    documentation: '**wp-run**\n\nRuns code during element initialization or lifecycle.\n\n**Syntax:** `data-wp-run="callbacks.handler"`\n\n**Value Type:** callbacks.handlerName\n\n**Examples:**\n```html\ndata-wp-run="callbacks.setup"\ndata-wp-run="callbacks.initializeComponent"\n```'
  },
  'wp-key': {
    name: 'wp-key',
    syntax: 'data-wp-key="unique-identifier"',
    description: 'Provides unique identifiers for elements in loops',
    valueType: 'string | expression',
    examples: [
      'data-wp-key="item.id"',
      'data-wp-key="context.uniqueId"'
    ],
    documentation: '**wp-key**\n\nProvides unique identifiers for elements in loops.\n\n**Syntax:** `data-wp-key="unique-identifier"`\n\n**Value Type:** string | expression\n\n**Examples:**\n```html\ndata-wp-key="item.id"\ndata-wp-key="context.uniqueId"\n```'
  },
  'wp-each': {
    name: 'wp-each',
    syntax: 'data-wp-each--itemname="array.reference"',
    description: 'Renders elements in a loop structure',
    details: 'Iterates through arrays in state/context',
    valueType: 'array expression',
    examples: [
      'data-wp-each--item="state.items"',
      'data-wp-each--post="context.posts"',
      'data-wp-each--product="state.products"'
    ],
    documentation: '**wp-each**\n\nRenders elements in a loop structure. Iterates through arrays in state/context.\n\n**Syntax:** `data-wp-each--itemname="array.reference"`\n\n**Value Type:** array expression\n\n**Examples:**\n```html\ndata-wp-each--item="state.items"\ndata-wp-each--post="context.posts"\ndata-wp-each--product="state.products"\n```'
  },
  'wp-each-child': {
    name: 'wp-each-child',
    syntax: 'data-wp-each-child',
    description: 'Marks child elements to repeat in wp-each loops',
    details: 'Used within wp-each containers',
    valueType: 'no value (boolean attribute)',
    examples: [
      'data-wp-each-child'
    ],
    documentation: '**wp-each-child**\n\nMarks child elements to repeat in wp-each loops. Used within wp-each containers.\n\n**Syntax:** `data-wp-each-child`\n\n**Value Type:** no value (boolean attribute)\n\n**Examples:**\n```html\n<ul data-wp-each--item="state.items">\n  <li data-wp-each-child data-wp-text="context.item.name"></li>\n</ul>\n```'
  }
};

export function getDirectiveByName(name: string): DirectiveDefinition | undefined {
  return directives[name];
}

export function getAllDirectiveNames(): string[] {
  return Object.keys(directives);
}
