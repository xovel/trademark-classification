const fs = require('fs');
const path = require('path');

let i = 1;
let n = 0;
const log = console.log;

while (i <= 45) {

  let name = i < 10 ? '0' + i : i;

  let curPath = path.join(__dirname, '..', 'data', name + '.json');

  if (!fs.existsSync(curPath)) {
    n++;
    fs.writeFile(curPath, '', (err) => {
      if (err) {
        log(`${curPath} 写入失败 ${err}`);
      } else {
        log(`${curPath} 写入成功`);
      }
    });
  }

  i++;
}

log(`created ${n} files`);
