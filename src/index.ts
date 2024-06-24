#! /usr/bin/env node

import { Command } from "commander";
import Pack from "../package.json";
import inquirer from "inquirer";
// import chalk from "chalk";

const program = new Command();
program
  .name(Pack.name)
  .version(Pack.version)
  .helpOption("-h,--help")
  .usage("<command> [option]");

// 增加一个选择命令
program.command("choose").action(() => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "testChoose",
        message: "please select",
        choices: [
          {
            name: "hahahha",
            value: 1,
          },
          {
            name: "zhangsan",
            value: 2,
          },
        ],
      },
    ])
    .then((answer) => {
      console.log(answer, "===answer");
    })
    .catch((error) => {
      throw error;
    });
});

// 增加一个创建命令
program
  .command("create <project-name>")
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    console.log(projectName, cmd);
  });

// config 命令
program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys);
  });

// 使用 on 命令监听指令的执行
program.on("--help", function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    " Run cliDemo1 <command> --help for detailed usage of given command."
  );
  console.log();
});

program.parse();
