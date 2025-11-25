// Prettier Configuration Template
module.exports = {
  // Line width
  printWidth: 100,

  // Tab width
  tabWidth: 2,

  // Use spaces instead of tabs
  useTabs: false,

  // Semicolons
  semi: true,

  // Single quotes
  singleQuote: true,

  // Quote props
  quoteProps: 'as-needed',

  // JSX quotes
  jsxSingleQuote: false,

  // Trailing commas
  trailingComma: 'es5',

  // Bracket spacing
  bracketSpacing: true,

  // JSX bracket same line
  jsxBracketSameLine: false,

  // Arrow function parentheses
  arrowParens: 'always',

  // Range format
  rangeStart: 0,
  rangeEnd: Infinity,

  // Parser
  parser: undefined, // Auto-detect

  // File path
  filepath: undefined,

  // Require pragma
  requirePragma: false,

  // Insert pragma
  insertPragma: false,

  // Prose wrap
  proseWrap: 'preserve',

  // HTML whitespace sensitivity
  htmlWhitespaceSensitivity: 'css',

  // End of line
  endOfLine: 'lf',

  // Embedded language formatting
  embeddedLanguageFormatting: 'auto',

  // Override for specific file types
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
        printWidth: 80,
      },
    },
    {
      files: '*.yml',
      options: {
        tabWidth: 2,
      },
    },
  ],
};
