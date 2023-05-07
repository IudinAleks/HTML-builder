const fs = require("fs");
const path = require('path')

const rstream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

let data = '';

rstream.on('data', chunk => data += chunk);
rstream.on('end', () => console.log('End', data));
rstream.on('error', error => console.log('Error', error.message));