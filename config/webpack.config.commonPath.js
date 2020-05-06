const path = require('path');

const devPath = relativePath => path.join(__dirname, relativePath);

const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appDevIndex: devPath('../client/src/pageReact.js'),
    appDevFile: devPath('../dev-dist'),
    appHtml: resolveApp('template/index.ejs'),
};
