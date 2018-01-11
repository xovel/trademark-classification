const fs = require('fs');
const path = require('path');

let allData = [];

let curList = fs.readdirSync(path.join(__dirname, 'data', 'd'));

let nc = require(path.join(__dirname, 'data', 'nc.json'));

nc.forEach(item => {
  let curData = require(path.join(__dirname, 'data', 'd', `${item.code}.json`));
  allData.push({
    id: item.id,
    code: item.code,
    name: item.name,
    pid: '',
    children: genChildren(curData, '', 1)
  });
});

function genChildren(data, pid, level) {
  let ret = [];

  if (level < 3) {
    data.forEach(item => {
      if ((item.pid === pid && level > 1) || (level === 1 && item.isParent === 'true')) {
        ret.push({
          id: item.id,
          code: item.code,
          name: item.name,
          pid: pid,
          children: genChildren(data, item.id, level + 1)
        });
      }
    });
  }

  return ret;
}



// for (let i = 0; i < curList.length; i++) {
//   let item = curList[i];
//   let name = item.split('.')[0];
//   let curData = require(path.join(__dirname, 'data', item));

//   if (name !== 'nc') {
//     curData.forEach(sub => {
//       if (sub.pid === '') {
//         sub.pid = name;
//       }
//     });
//   }

//   allData = allData.concat(curData);

// }

const log = console.log;
wFile(path.join(__dirname, 'data', 'all.json'), JSON.stringify(allData, null, '  '));

function wFile(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      log(`${filePath} 写入失败 ${err}`);
    } else {
      log(`${filePath} 写入成功`);
    }
  });
}
