const fs = require("fs");

const file = [
  { url: "./source/1.txt", name: "1" },
  { url: "./source/2.txt", name: "2" },
];

file.forEach(file => {
  const json = [];
  const data = fs.readFileSync(file.url);
  data
    .toString()
    .split("\n")
    .forEach(function (item) {
      const [name, value] = item.split("\t");

      json.push({
        name,
        value,
      });
    });

  fs.writeFile(`./${file.name}.json`, JSON.stringify(json), () => {});
});
