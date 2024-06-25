import CommandCreate from "./create";

import CommandChalk from "./test/chalk";
import CommandInquirer from "./test/inquirer";
import CommandLoading from "./test/loading";

const commands = {
  "create <project-name>": {
    description: "create a Project",
    option: [
      {
        cmd: "-f,--force",
        msg: "overwrite target if it ecists",
      },
    ],
    action: CommandCreate,
  },
  chalk: {
    description: "test chalk.js",
    option: [
      {
        cmd: "-t,--test",
        msg: "test option of CommandChalk",
      },
    ],
    action: CommandChalk,
  },
  choose: {
    description: "test inquirer.js",
    option: [
      {
        cmd: "-t,--test",
        msg: "test option of CommandInquirer",
      },
    ],
    action: CommandInquirer,
  },
  loading: {
    description: "test loading-cli.js",
    option: [
      {
        cmd: "-t,--test",
        msg: "test option of CommandLoading",
      },
    ],
    action: CommandLoading,
  },
};

export default commands;
