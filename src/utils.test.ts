import {
  extractDirectiveName,
  containsDirective,
  extractDirectiveAttributes,
  getBaseDirectiveName,
} from './utils';

describe('Utils', () => {
  describe('extractDirectiveName', () => {
    it('should extract directive name from simple attribute', () => {
      expect(extractDirectiveName('data-wp-interactive')).toBe('wp-interactive');
      expect(extractDirectiveName('data-wp-context')).toBe('wp-context');
      expect(extractDirectiveName('data-wp-text')).toBe('wp-text');
    });

    it('should extract directive name from attribute with suffix', () => {
      expect(extractDirectiveName('data-wp-bind--hidden')).toBe('wp-bind');
      expect(extractDirectiveName('data-wp-class--active')).toBe('wp-class');
      expect(extractDirectiveName('data-wp-style--color')).toBe('wp-style');
    });

    it('should extract directive name from attribute with value', () => {
      expect(extractDirectiveName('data-wp-text="state.message"')).toBe('wp-text');
      expect(extractDirectiveName('data-wp-bind--hidden="state.isHidden"')).toBe('wp-bind');
    });

    it('should extract compound directive names', () => {
      expect(extractDirectiveName('data-wp-on--click')).toBe('wp-on');
      expect(extractDirectiveName('data-wp-on-async--submit')).toBe('wp-on-async');
      expect(extractDirectiveName('data-wp-on-window--resize')).toBe('wp-on-window');
      expect(extractDirectiveName('data-wp-on-async-window--load')).toBe('wp-on-async-window');
      expect(extractDirectiveName('data-wp-on-document--click')).toBe('wp-on-document');
      expect(extractDirectiveName('data-wp-on-async-document--ready')).toBe('wp-on-async-document');
    });

    it('should return null for non-directive attributes', () => {
      expect(extractDirectiveName('class="container"')).toBeNull();
      expect(extractDirectiveName('id="main"')).toBeNull();
      expect(extractDirectiveName('data-custom="value"')).toBeNull();
    });

    it('should handle wp-each and wp-each-child', () => {
      expect(extractDirectiveName('data-wp-each--item')).toBe('wp-each');
      expect(extractDirectiveName('data-wp-each-child')).toBe('wp-each-child');
    });
  });

  describe('containsDirective', () => {
    it('should return true for lines with directives', () => {
      expect(containsDirective('<div data-wp-interactive="myPlugin">')).toBe(true);
      expect(containsDirective('<button data-wp-on--click="actions.toggle">')).toBe(true);
      expect(containsDirective('<span data-wp-text="state.message"></span>')).toBe(true);
    });

    it('should return false for lines without directives', () => {
      expect(containsDirective('<div class="container">')).toBe(false);
      expect(containsDirective('<p>Hello world</p>')).toBe(false);
      expect(containsDirective('const x = 10;')).toBe(false);
    });

    it('should handle multiple directives on one line', () => {
      expect(containsDirective('<div data-wp-interactive="test" data-wp-context="{}">')).toBe(true);
    });
  });

  describe('extractDirectiveAttributes', () => {
    it('should extract single directive attribute', () => {
      const result = extractDirectiveAttributes('<div data-wp-interactive="myPlugin">');
      expect(result).toEqual(['data-wp-interactive="myPlugin"']);
    });

    it('should extract multiple directive attributes', () => {
      const result = extractDirectiveAttributes(
        '<div data-wp-interactive="test" data-wp-context=\'{"key": "value"}\'>'
      );
      expect(result).toHaveLength(2);
      expect(result).toContain('data-wp-interactive="test"');
      expect(result).toContain('data-wp-context=\'{"key": "value"}\'');
    });

    it('should extract directives with suffix', () => {
      const result = extractDirectiveAttributes(
        '<button data-wp-on--click="actions.toggle" data-wp-class--active="state.isActive">'
      );
      expect(result).toHaveLength(2);
      expect(result).toContain('data-wp-on--click="actions.toggle"');
      expect(result).toContain('data-wp-class--active="state.isActive"');
    });

    it('should return empty array for lines without directives', () => {
      const result = extractDirectiveAttributes('<div class="container">');
      expect(result).toEqual([]);
    });

    it('should handle directives without values', () => {
      const result = extractDirectiveAttributes('<template data-wp-each-child>');
      expect(result).toContain('data-wp-each-child');
    });

    it('should handle mixed quotes', () => {
      const result = extractDirectiveAttributes(
        '<div data-wp-bind--hidden="state.hide" data-wp-text=\'state.text\'>'
      );
      expect(result).toHaveLength(2);
      expect(result).toContain('data-wp-bind--hidden="state.hide"');
      expect(result).toContain('data-wp-text=\'state.text\'');
    });
  });

  describe('getBaseDirectiveName', () => {
    it('should return the base directive name', () => {
      expect(getBaseDirectiveName('wp-bind')).toBe('wp-bind');
      expect(getBaseDirectiveName('wp-on')).toBe('wp-on');
      expect(getBaseDirectiveName('wp-interactive')).toBe('wp-interactive');
    });

    it('should handle compound directive names', () => {
      expect(getBaseDirectiveName('wp-on-async')).toBe('wp-on-async');
      expect(getBaseDirectiveName('wp-on-window')).toBe('wp-on-window');
      expect(getBaseDirectiveName('wp-on-async-window')).toBe('wp-on-async-window');
      expect(getBaseDirectiveName('wp-each-child')).toBe('wp-each-child');
    });

    it('should return input if no match found', () => {
      expect(getBaseDirectiveName('custom-directive')).toBe('custom-directive');
      expect(getBaseDirectiveName('invalid')).toBe('invalid');
    });
  });
});
