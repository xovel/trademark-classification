const fs = require('fs');
const path = require('path');

var express = require('express');
var app = express();

const genTreeData = require('./genTreeData');

const allData = require('../data/all.json');

app.use(express.static(path.join(__dirname, '..', 'vendor')));
app.use(express.static(path.join(__dirname, '..')));

// POST method route
app.get('/api/search', function (req, res) {

  let ret = [];
  let n = -1;

  let query = req.query;

  if (query.name) {
    let { sret, num } = searchData(allData, query.name);
    ret = sret;
    n = num;
  } else {
    ret = allData;
  }

  res.json({
    code: 0,
    data: ret,
    num: n,
    message: 'success'
  });
});

var server = app.listen(3000, function () {

  var port = server.address().port;

  console.log('Example app listening at http://localhost:%s', port);
});

function searchData(data, name, codeFlag) {
  var ret = [];
  var n = 0;

  for (let i = 0; i < data.length; i++) {
    let le1 = false;
    let data1 = data[i];
    let ret1 = [];

    for (let j = 0; j < data1.children.length; j++) {
      let le2 = false;
      let data2 = data1.children[j];
      let ret2 = [];

      for (let k = 0; k < data2.children.length; k++) {
        let data3 = data2.children[k];

        if (checkData(data3, name, codeFlag)) {
          le2 = true;
          ret2.push({
            id: data3.id,
            code: data3.code,
            name: data3.name
          });
        }
      }

      if (le2 || checkData(data2, name, codeFlag)) {
        le1 = true;
        ret1.push({
          id: data2.id,
          code: data2.code,
          name: data2.name,
          children: ret2
        });
      }
    }

    if (le1 || checkData(data1, name, codeFlag)) {
      ret.push({
        id: data1.id,
        code: data1.code,
        name: data1.name,
        children: ret1
      });
    }
  }

  function checkData(data, name, codeFlag) {
    let ret = (data.name.indexOf(name) > -1 || (!!codeFlag && data.code.indexOf(name) > -1));
    if (ret) {
      ++n;
    }
    return ret;
  }

  return {sret: ret, num: n};
}

