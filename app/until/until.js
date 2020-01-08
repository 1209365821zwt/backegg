'use strict';
const arrayToTree = (data, parentKey) => {
  const dataJSON = {};
  const newData = [];
  data.forEach(item => {
    dataJSON[item.id] = item;
  });
  data.forEach(item => {
    if (item[parentKey] === 0) {
      newData.push(item);
    } else {
      const parent_id = item[parentKey];
      const parent = dataJSON[parent_id];
      if (parent.children) {
        parent.children.push(item);
      } else {
        parent.children = [ item ];
      }
    }
  });
  return newData;
};
module.exports = {
  arrayToTree,
};
