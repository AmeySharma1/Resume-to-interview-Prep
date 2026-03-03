const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function testUpload() {
    try {
        // Create a fake PDF file
        fs.writeFileSync('test.pdf', '%PDF-1.4\n1 0 obj\n<<\n/Title (Test PDF)\n>>\nendobj\ntrailer\n<<\n/Root 1 0 R\n>>\n%%EOF');

        const form = new FormData();
        form.append('jobDescription', 'Software Engineer');
        form.append('selfDescription', 'I am great');
        form.append('resume', fs.createReadStream('test.pdf')); // Append the file

        // Wait a bit to ensure server is ready
        setTimeout(async () => {
            try {
                // In my script, I need JWT token. Wait, the route is protected by `authMiddleware.authUser`!
                // Ah! `authMiddleware` checks for `req.cookies.token`.
                // Let me just look at the backend logs directly! If it's a 500 error, I can just console.log the error in my server terminal!
            } catch (err) {
                console.error('Upload error:', err.response ? err.response.data : err.message);
            }
        }, 1000);
    } catch (e) {
        console.error(e);
    }
}

testUpload();
