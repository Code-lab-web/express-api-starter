import { multiply } from './1-multiplication';

describe('multiplication', () => {
    it('should multiply two numbers correctly', () => {
        expect(multiply(2, 3)).toBe(6);
    });
});