#! /usr/bin/env node

import { Command } from "commander";
import Pack from "../package.json";

import commands from "./commands";

const program = new Command();
program
  .name(Pack.name)
  .version(Pack.version)
  .helpOption("-h,--help")
  .usage("<command> [option]");
Object.keys(commands).forEach((currentCommandKey) => {
  // 拿到当前命令的配置项对象
  const currentCommandValue = commands[currentCommandKey];
  // 注册当前命令并返回一个对象
  const currentCommand = program.command(currentCommandKey);
  if (currentCommandValue.option && currentCommandValue.option.length > 0) {
    currentCommandValue.option.forEach((item) => {
      currentCommand.option(item.cmd, item.msg || "");
    });
  }
  // 当前命令的描述信息
  currentCommand.description(currentCommandValue.description);
  // 当前命令的执行函数
  currentCommand.action(currentCommandValue.action);
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
