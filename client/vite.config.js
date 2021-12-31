import path from "path";
import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const rootPath = path.join(process.cwd(), "src");

const fileRegex = /\.html$/;
function myPlugin() {
  return {
    name: "transform-file",

    writeBundle(outputOptions) {
      const output = outputOptions.dir;
      console.log(output);

      const files = fs.readdirSync(output);
      files.forEach(el => {
        if (fileRegex.test(el)) {
          const html = fs.readFileSync(output + "/" + el);
          fs.writeFile(output + "/index.ftl", html.toString(), () => {});
          fs.unlink(output + "/index.html", () => {});
        }
      });
    },
  };
}

export default defineConfig(({ command, mode }) => {
  // console.log(command, mode);
  return {
    root: rootPath,
    base: `https://file.yzcdn.cn/mall-cloud/ppppp/`,
    plugins: [
      react({
        babel: {
          presets: ["@babel/preset-react"],
        },
      }),
      myPlugin(),
    ],
    build: { target: "es2015" },
  };
});
