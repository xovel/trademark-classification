module.exports = function (data, id = 'id', pid = 'pid') {
  let ret = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (item.pid === '') {
      item.children = genChildren(data, item.code, 1);
      ret.push(item);
    }
  }
  return ret;
}

function genChildren(data, pid, level) {
  var ret = [];
  for (var i = 0; i < data.length; i++) {
    var temp = data[i];
    if (temp.pid === pid) {
      if (level < 3) {
        temp.children = genChildren(data, temp.id, level + 1);
      }
      ret.push(temp);
    }
  }
  return ret;
}
