#!/usr/bin/env node

var fs = require("fs");
const program = require("commander");

program
  .command("init <type>")
  .option("-t, --type <name>", "init type", "default")
  .action((env, opt) => {
    readmeFile(env, opt);
  });

program.parse(process.argv);

function readmeFile(env, opt) {
  var data = fs.readFileSync("./test/demo.txt");
  console.log(env, opt);
  console.log(data.toString());
}
