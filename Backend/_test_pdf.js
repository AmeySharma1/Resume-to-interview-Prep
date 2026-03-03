const pdfParse = require('pdf-parse');
const fs = require('fs');

async function testPdf() {
    try {
        fs.writeFileSync('test.pdf', '%PDF-1.4\n1 0 obj\n<<\n/Title (Test PDF)\n>>\nendobj\ntrailer\n<<\n/Root 1 0 R\n>>\n%%EOF');
        const buffer = fs.readFileSync('test.pdf');

        console.log("Export keys:", Object.keys(pdfParse));

        const parser = new pdfParse.PDFParse(Uint8Array.from(buffer));
        console.log("Parser created.");

        const content = await parser.getText();
        console.log("Content:", content);
        console.log("Type of content:", typeof content);

    } catch (e) {
        console.error("PDF Test Error:", e);
    }
}

testPdf();
