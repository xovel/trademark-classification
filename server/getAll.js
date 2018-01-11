const fs = require('fs');
const path = require('path');

let allData = [];

let curList = fs.readdirSync(path.join(__dirname, '..', 'data'));

for (let i = 0; i < curList.length; i++) {
  let item = curList[i];
  let name = item.split('.')[0];
  let curData = require(path.join(__dirname, '..', 'data', item));

  if (name !== 'nc') {
    curData.forEach(sub => {
      if (sub.pid === '') {
        sub.pid = name;
      }
    });
  }

  allData = allData.concat(curData);

}

module.exports = allData;
