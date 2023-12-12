function add(a: number, b: number): number {
    return a + b;
}

describe('add function', () => {
    it('adds two numbers correctly', () => {
        // Arrange
        const a = 3;
        const b = 4;

        // Act
        const result = add(a, b);

        // Assert
        expect(result).toBe(7);
    });

    it('handles negative numbers', () => {
        // Arrange
        const a = -2;
        const b = 5;

        // Act
        const result = add(a, b);

        // Assert
        expect(result).toBe(3);
    });
});