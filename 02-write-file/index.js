const fs = require('fs');
const path = require('path');
const {stdin, stdout} = require('process');

const wstream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Введите текст:');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    sayByeFunc();
  }
  wstream.write(data);
});
process.on('SIGINT', sayByeFunc);

function sayByeFunc() {
  stdout.write('Пока!');
  process.exit();
}