const fs = require('fs');
const path = require('path');

const log = console.log;

if (!fs.existsSync('../js')) {
  fs.mkdirSync('../js');
}

let curList = fs.readdirSync('../data');

let ret = [];

for (let i = 0; i < curList.length; i++) {
  let item = curList[i];
  let name = item.split('.')[0];
  let curPath = path.join(__dirname, '..', 'js', name + '.js');
  let srcPath = path.join(__dirname, '..', 'data', item);
  let fileContent = rFile(srcPath);

  ret.push(`"${name}": ${fileContent}`);

  wFile(curPath, `module.exports = ${fileContent};`);
}

wFile('../all.js', `window.allData = {
${ret.join(',\n')}
}`);

function rFile(filePath, charset = 'utf8') {
  let curContent = fs.readFileSync(filePath, charset);
  return curContent.replace(/\s+$/, '');
}

function wFile(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      log(`${filePath} 写入失败 ${err}`);
    } else {
      log(`${filePath} 写入成功`);
    }
  });
}
