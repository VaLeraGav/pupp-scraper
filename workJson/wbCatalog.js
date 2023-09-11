import * as fs from 'fs';

const deleteByUrl = (tree) => {
  for (const key in tree) {
    const node = tree[key]
    if ((node.url && node.url.substr(0, 4) != "/catalog/")) {
      // If the parent of this element is a Array, we must remove it with splice
      if (tree instanceof Array) {
        tree.splice(key, 1)
      } else {
        delete tree[key]
      }
    } else if (typeof node === 'object') {
      deleteByUrl(node)
    }
  }
}
var jsonObject = JSON.parse(fs.readFileSync('./all-category.json', 'utf8'));
deleteByUrl(jsonObject)

fs.writeFile("cat.json", JSON.stringify(jsonObject), function (err) {
  if (err) {
    return console.log(err);
  }
});
