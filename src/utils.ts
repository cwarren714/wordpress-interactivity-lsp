/**
 * Extract directive name from a data attribute string
 * @param attribute The attribute string (e.g., "data-wp-bind--hidden")
 * @returns The directive name (e.g., "wp-bind") or null if not found
 */
export function extractDirectiveName(attribute: string): string | null {
  // match like:
  // data-wp-bind--hidden -> wp-bind
  // data-wp-on-async--click -> wp-on-async
  // data-wp-interactive -> wp-interactive
  const match = attribute.match(/data-(wp-[a-z-]+?)(?:--|[=\s>]|$)/);
  return match ? match[1] : null;
}

/**
 * Check if a line contains a WordPress Interactivity API directive
 * @param line The line of text to check
 * @returns True if the line contains a directive
 */
export function containsDirective(line: string): boolean {
  return /data-wp-[a-z-]+/.test(line);
}

/**
 * Extract all directive attributes from a line of text
 * @param line The line of text to search
 * @returns Array of directive attribute strings
 */
export function extractDirectiveAttributes(line: string): string[] {
  const regex = /data-wp-[a-z-]+(?:--[a-z-]+)?(?:="[^"]*"|='[^']*')?/g;
  const matches = line.match(regex);
  return matches || [];
}

/**
 * Get the base directive name without any suffixes
 * @param directiveName The full directive name (e.g., "wp-on-async-window")
 * @returns The base name
 */
export function getBaseDirectiveName(directiveName: string): string {
  // for directives like wp-bind--attribute, we want wp-bind
  // for directives like wp-on--click, we want wp-on
  const match = directiveName.match(/^(wp-[a-z-]+)/);
  return match ? match[1] : directiveName;
}
