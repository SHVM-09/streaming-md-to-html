import { MdToHtml } from '../index';
import fs from 'fs';
import path from 'path';

describe('MdToHtml File-Based Tests', () => {
    let parser: MdToHtml;
    let markdownContent: string;
    let expectedHtmlContent: string;

    beforeAll(() => {
        // Read Markdown file
        markdownContent = fs.readFileSync(path.join(__dirname, 'testCases.md'), 'utf8');

        // Read Expected HTML file
        expectedHtmlContent = fs.readFileSync(path.join(__dirname, 'expectedOutput.html'), 'utf8')
            .replace(/\s+/g, ' ') // Normalize multiple spaces
            .replace(/>\s+</g, '><') // ✅ Remove spaces between HTML tags
            .trim();
    });

    beforeEach(() => {
        parser = new MdToHtml();
    });

    test('should correctly convert markdown to HTML', () => {
        parser.append(markdownContent);
        let generatedHtml = parser.getHtml(parser.lines);

        // Normalize generated HTML formatting
        generatedHtml = generatedHtml
            .replace(/\s+/g, ' ') // Remove extra spaces
            .replace(/>\s+</g, '><') // ✅ Remove spaces between HTML tags
            .trim();

        console.log('Generated HTML:', generatedHtml);
        console.log('Expected HTML:', expectedHtmlContent);

        expect(generatedHtml).toBe(expectedHtmlContent);
    });
});