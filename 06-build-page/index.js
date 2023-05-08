let path = require('path');
let fs = require('fs');
let stylesDir = path.join(__dirname, 'styles');
let copyDir = path.join(__dirname, 'project-dist');
let assetsDirCopy = path.join(copyDir, 'assets');
let componentsDir = path.join(__dirname, 'components');
let assetsDir = path.join(__dirname, 'assets');

fs.readdir(stylesDir, {withFileTypes: true}, async (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(function (file, index) {
            let filePath = path.join(stylesDir, file.name);
            if (file.isFile() && file.name.split('.')[1] === 'css') {
                fs.readFile(filePath, 'utf8', function (error, data) {
                    if (error) {
                        console.log(error);
                    } else if (index === 0) {
                        fs.writeFile(path.join(copyDir, 'style.css'), data, function (error) {
                            if (error)
                                console.log(error);
                        });
                    } else {
                        fs.appendFile(path.join(copyDir, 'style.css'), data, function (error) {
                            if (error)
                                console.log(error);
                        });
                    }
                });
            }
        });
    }
});

function recurceCopy(dir, exit) {
    fs.readdir(dir, {withFileTypes: true}, function (error, files) {
        if (error) throw error;
        files.forEach(function (file) {
            if (!file.isFile()) {
                fs.stat(path.join(exit, file.name), function (error) {
                    if (error) {
                        fs.mkdir(path.join(exit, file.name), function (error) {
                            if (error) {
                                return console.erroror(error);
                            }
                        });
                        recurceCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
                    } else {
                        recurceCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
                    }
                });
            } else {
                fs.copyFile(`${dir}\\${file.name}`, `${exit}\\${file.name}`, function (error) {
                    if (error) throw error;
                });
            }
        });
    });
}

fs.stat(copyDir, function (error) {
    if (error) {
        fs.mkdir(copyDir, function (error) {
            if (error) {
                return console.error(error);
            }
        });
        createTemplate();
    } else {
        fs.readdir(copyDir, function (error) {
            if (error)
                console.log(error);
            else {

                createTemplate();
            }
        });
    }
});

fs.stat(assetsDirCopy, function (error) {
    if (error) {
        fs.mkdir(assetsDirCopy, function (error) {
            if (error) {
                return console.erroror(error);
            }

        });
        recurceCopy(assetsDir, assetsDirCopy);
    } else {
        recurceCopy(assetsDir, assetsDirCopy);
    }
});

function createTemplate() {
    fs.copyFile(`${__dirname}\\template.html`, `${copyDir}\\index.html`, function (error) {
        if (error) throw error;
        fs.readFile(`${copyDir}\\index.html`, 'utf8', function (error, data) {
            if (error) throw error;
            fs.readdir(componentsDir, {withFileTypes: true}, function (error, files) {
                if (error) throw error;

                files.forEach(function (file) {
                    fs.readFile(`${componentsDir}\\${file.name}`, 'utf8', function (error, dataFile) {
                        if (error) throw error;
                        let tagName = `{{${file.name.split('.')[0]}}}`;
                        data = data.replace(tagName, dataFile);
                        fs.writeFile(`${copyDir}\\index.html`, data, function (error) {
                            if (error)
                                console.log(error);
                        });
                    });
                });
            });
        });
    });
}