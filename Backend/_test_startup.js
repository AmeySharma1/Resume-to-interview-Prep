require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/database');

connectToDB()
    .then(() => {
        console.log('DB connected successfully');
        const srv = app.listen(3000, () => {
            console.log('Server running on port 3000');
            setTimeout(() => {
                srv.close();
                process.exit(0);
            }, 2000);
        });
    })
    .catch(err => {
        console.error('Startup error:', err.message);
        process.exit(1);
    });
