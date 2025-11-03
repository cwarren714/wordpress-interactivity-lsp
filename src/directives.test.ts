import { directives, getDirectiveByName, getAllDirectiveNames } from './directives';

describe('Directive Definitions', () => {
  describe('directives object', () => {
    it('should contain all 18 WordPress Interactivity API directives', () => {
      const expectedDirectives = [
        'wp-interactive',
        'wp-context',
        'wp-bind',
        'wp-class',
        'wp-style',
        'wp-text',
        'wp-on',
        'wp-on-async',
        'wp-on-window',
        'wp-on-async-window',
        'wp-on-document',
        'wp-on-async-document',
        'wp-watch',
        'wp-init',
        'wp-run',
        'wp-key',
        'wp-each',
        'wp-each-child',
      ];

      expectedDirectives.forEach((directive) => {
        expect(directives[directive]).toBeDefined();
      });

      expect(Object.keys(directives).length).toBe(18);
    });

    it('should have required properties for each directive', () => {
      Object.values(directives).forEach((directive) => {
        expect(directive).toHaveProperty('name');
        expect(directive).toHaveProperty('syntax');
        expect(directive).toHaveProperty('description');
        expect(directive).toHaveProperty('valueType');
        expect(directive).toHaveProperty('examples');
        expect(directive).toHaveProperty('documentation');

        expect(typeof directive.name).toBe('string');
        expect(typeof directive.syntax).toBe('string');
        expect(typeof directive.description).toBe('string');
        expect(typeof directive.valueType).toBe('string');
        expect(Array.isArray(directive.examples)).toBe(true);
        expect(typeof directive.documentation).toBe('string');
      });
    });

    it('should have at least one example for each directive', () => {
      Object.values(directives).forEach((directive) => {
        expect(directive.examples.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getDirectiveByName', () => {
    it('should return the correct directive for valid names', () => {
      const directive = getDirectiveByName('wp-interactive');
      expect(directive).toBeDefined();
      expect(directive?.name).toBe('wp-interactive');
    });

    it('should return undefined for invalid directive names', () => {
      const directive = getDirectiveByName('wp-invalid');
      expect(directive).toBeUndefined();
    });

    it('should return correct directive for wp-bind', () => {
      const directive = getDirectiveByName('wp-bind');
      expect(directive).toBeDefined();
      expect(directive?.name).toBe('wp-bind');
      expect(directive?.syntax).toContain('data-wp-bind--attribute');
    });

    it('should return correct directive for wp-on', () => {
      const directive = getDirectiveByName('wp-on');
      expect(directive).toBeDefined();
      expect(directive?.name).toBe('wp-on');
      expect(directive?.valueType).toBe('actions.handlerName');
    });
  });

  describe('getAllDirectiveNames', () => {
    it('should return an array of all directive names', () => {
      const names = getAllDirectiveNames();
      expect(Array.isArray(names)).toBe(true);
      expect(names.length).toBe(18);
    });

    it('should include all major directives', () => {
      const names = getAllDirectiveNames();
      expect(names).toContain('wp-interactive');
      expect(names).toContain('wp-context');
      expect(names).toContain('wp-bind');
      expect(names).toContain('wp-on');
      expect(names).toContain('wp-each');
    });
  });

  describe('Specific directive content', () => {
    it('wp-interactive should have correct syntax', () => {
      const directive = directives['wp-interactive'];
      expect(directive.syntax).toContain('data-wp-interactive');
      expect(directive.valueType).toContain('string');
    });

    it('wp-context should accept JSON object', () => {
      const directive = directives['wp-context'];
      expect(directive.valueType).toBe('JSON object');
      expect(directive.examples.some((ex) => ex.includes('{ "'))).toBe(true);
    });

    it('wp-bind should support attribute binding', () => {
      const directive = directives['wp-bind'];
      expect(directive.syntax).toContain('--attribute');
      expect(directive.valueType).toContain('boolean');
      expect(directive.valueType).toContain('string');
    });

    it('wp-class should support class name binding', () => {
      const directive = directives['wp-class'];
      expect(directive.syntax).toContain('--classname');
      expect(directive.valueType).toBe('boolean expression');
    });

    it('wp-on should reference actions', () => {
      const directive = directives['wp-on'];
      expect(directive.valueType).toBe('actions.handlerName');
      expect(directive.examples.some((ex) => ex.includes('actions.'))).toBe(true);
    });

    it('wp-watch should reference callbacks', () => {
      const directive = directives['wp-watch'];
      expect(directive.valueType).toBe('callbacks.handlerName');
      expect(directive.examples.some((ex) => ex.includes('callbacks.'))).toBe(true);
    });

    it('wp-each should have loop syntax', () => {
      const directive = directives['wp-each'];
      expect(directive.syntax).toContain('--itemname');
      expect(directive.valueType).toBe('array expression');
    });

    it('wp-each-child should be a boolean attribute', () => {
      const directive = directives['wp-each-child'];
      expect(directive.valueType).toBe('no value (boolean attribute)');
    });
  });

  describe('Documentation completeness', () => {
    it('all directives should have markdown documentation', () => {
      Object.values(directives).forEach((directive) => {
        expect(directive.documentation).toContain('**');
        expect(directive.documentation).toContain('Syntax:');
        expect(directive.documentation).toContain('Value Type:');
        expect(directive.documentation).toContain('Examples:');
      });
    });

    it('all directives should have code examples in documentation', () => {
      Object.values(directives).forEach((directive) => {
        expect(directive.documentation).toContain('```');
      });
    });
  });
});
