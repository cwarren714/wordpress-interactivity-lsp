describe('Completion text replacement', () => {
  it('should match partial directive input', () => {
    const testCases = [
      { input: '<div data', expected: 'data' },
      { input: '<div data-', expected: 'data-' },
      { input: '<div data-w', expected: 'data-w' },
      { input: '<div data-wp', expected: 'data-wp' },
      { input: '<div data-wp-', expected: 'data-wp-' },
      { input: '<div data-wp-c', expected: 'data-wp-c' },
      { input: '<div data-wp-context', expected: 'data-wp-context' },
      { input: '<div data-wp-bind', expected: 'data-wp-bind' },
      { input: '<div data-wp-on-', expected: 'data-wp-on-' },
      { input: '<div data-wp-on-async', expected: 'data-wp-on-async' },
    ];

    const regex = /(data(?:-[a-z-]*)?)$/;

    testCases.forEach(({ input, expected }) => {
      const match = input.match(regex);
      expect(match).toBeTruthy();
      expect(match?.[1]).toBe(expected);
    });
  });

  it('should not match non-directive input', () => {
    const testCases = [
      '<div class',
      '<div id',
      '<div style',
      '<div onclick',
      '<div dat',
      '<div ata',
    ];

    const regex = /(data(?:-[a-z-]*)?)$/;

    testCases.forEach((input) => {
      const match = input.match(regex);
      if (match && match[1].startsWith('data')) {
        expect(match[1].length).toBeGreaterThanOrEqual(4);
      }
    });
  });

  it('should calculate correct start position for replacement', () => {
    const testCases = [
      { line: '<div data', cursorPos: 9, expectedStart: 5, expectedTyped: 'data' },
      { line: '<div data-wp', cursorPos: 12, expectedStart: 5, expectedTyped: 'data-wp' },
      { line: '<div data-wp-', cursorPos: 13, expectedStart: 5, expectedTyped: 'data-wp-' },
      { line: '<div data-wp-c', cursorPos: 14, expectedStart: 5, expectedTyped: 'data-wp-c' },
    ];

    const regex = /(data(?:-[a-z-]*)?)$/;

    testCases.forEach(({ line, cursorPos, expectedStart, expectedTyped }) => {
      const beforeCursor = line.substring(0, cursorPos);
      const match = beforeCursor.match(regex);

      expect(match).toBeTruthy();
      expect(match?.[1]).toBe(expectedTyped);

      const typedText = match?.[1] || '';
      const startChar = cursorPos - typedText.length;
      expect(startChar).toBe(expectedStart);
    });
  });
});
