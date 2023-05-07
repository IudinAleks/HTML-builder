const fs = require('fs');
const path = require('path');
const getInfoFile = function (file) {
  if (file.isFile()) {
    let data = [];
    fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (err, stats) => {
      if (err) {
        return console.log(err);
      }
      data.push(file.name.split('.').join(' - '));
      data.push((stats.size / 1024) + 'Kb');
      console.log(data.join(' - '));
    });
  }
};
fs.promises.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true})
    .then(files => files.forEach(file => {
          getInfoFile(file)
        })
    );