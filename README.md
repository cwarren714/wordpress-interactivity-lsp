# WordPress Interactivity API Language Server

A Language Server Protocol (LSP) implementation for WordPress Interactivity API directives. 
This language server provides autocomplete, hover documentation, and signature help for all 
WordPress Interactivity API directives in HTML files.

## Features

- **Autocomplete**: Smart completion for all `data-wp-*` directives
- **Hover Documentation**: View detailed documentation for directives on hover
- **Signature Help**: Get type information and examples when writing directive values
- **Full Directive Coverage**: Supports all 18 WordPress Interactivity API directives

## Supported Directives

- `wp-interactive` - Activate interactivity for elements
- `wp-context` - Provide local state
- `wp-bind` - Bind attributes to state
- `wp-class` - Toggle CSS classes
- `wp-style` - Apply dynamic styles
- `wp-text` - Set text content
- `wp-on` - Attach event listeners (sync)
- `wp-on-async` - Attach event listeners (async)
- `wp-on-window` - Listen to window events (sync)
- `wp-on-async-window` - Listen to window events (async)
- `wp-on-document` - Listen to document events (sync)
- `wp-on-async-document` - Listen to document events (async)
- `wp-watch` - Watch for state changes
- `wp-init` - Initialize elements
- `wp-run` - Run code during lifecycle
- `wp-key` - Provide unique identifiers
- `wp-each` - Render loops
- `wp-each-child` - Mark loop children

## Installation

### Via npm

```bash
npm install -g wordpress-interactivity-lsp
```

### Local Development/Testing

To install and test locally without publishing to npm:

```bash
# Clone the repository
git clone https://github.com/cwarren714/wordpress-interactivity-lsp.git
cd wordpress-interactivity-lsp

# Install dependencies
npm install

# Build the project
npm run build

# Link globally for local testing
npm link

# The LSP is now available as 'wordpress-interactivity-lsp' command
# You can now use it in your editor configuration
```

To unlink later:
```bash
npm unlink -g wordpress-interactivity-lsp
```

## Usage

### Neovim

Add the following configuration to your neovim setup

```lua
vim.lsp.config('wordpress-interactivity-lsp', {
  cmd = { 'wordpress-interactivity-lsp', '--stdio' },
  filetypes = { 'html', 'php' },
  root_markers = { 'package.json', '.git', 'composer.json' },
})

vim.api.nvim_create_autocmd('FileType', {
  -- or whatever filetypes you want 
  pattern = { 'html', 'php' },
  callback = function(args)
    vim.lsp.enable('wordpress-interactivity-lsp')
  end,
})
```


### VS Code

Create a `.vscode/settings.json` file in your project:

```json
{
  "html.languageServers": [
    {
      "id": "wordpress-interactivity",
      "name": "WordPress Interactivity API",
      "command": "wordpress-interactivity-lsp",
      "args": ["--stdio"],
      "filetypes": ["html", "php"]
    }
  ]
}
```

### Other Editors

Any editor that supports LSP can use this language server. Configure it to:

- **Command**: `wordpress-interactivity-lsp --stdio`
- **File types**: HTML, PHP (or any files containing WordPress templates)
- **Transport**: stdio

## Quick Start (Local Testing)

1. **Install and build**:
   ```bash
   npm install
   npm run build
   npm link
   ```

2. **Add to your Neovim config**:
   ```lua
   vim.lsp.config('wordpress-interactivity-lsp', {
     cmd = { 'wordpress-interactivity-lsp', '--stdio' },
     filetypes = { 'html', 'php' },
     root_markers = { 'package.json', '.git', 'composer.json' },
   })

   vim.api.nvim_create_autocmd('FileType', {
     pattern = { 'html', 'php' },
     callback = function(args)
       vim.lsp.enable('wordpress-interactivity-lsp')
     end,
   })
   ```

3. **Test it**:
   - Open `examples/demo.html` in Neovim
   - Type `data-wp` and see autocomplete suggestions
   - Hover over any `data-wp-*` attribute to see documentation
   - Edit a directive value to see signature help

## Development

### Setup

```bash
npm install
```

### Build

```bash
npm run build
```

### Watch mode (auto-rebuild on changes)

```bash
npm run watch
```

### Run tests

```bash
npm test
```

### Test coverage

```bash
npm test -- --coverage
```

### Testing changes in Neovim

After making changes to the source code:

```bash
# Rebuild
npm run build

# The LSP will automatically use the updated version
# Just restart Neovim or reload the buffer
```

## Project Structure

```
.
├── src/
│   ├── server.ts         # Main LSP server implementation
│   ├── directives.ts     # Directive definitions and documentation
│   ├── utils.ts          # Helper utilities
│   ├── index.ts          # Package exports
│   └── *.test.ts         # Test files
├── dist/                 # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## Resources

- [WordPress Interactivity API Documentation](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/)
- [Language Server Protocol Specification](https://microsoft.github.io/language-server-protocol/)

## License

MIT
