import inquirer from "inquirer";

export default function () {
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
      console.log("Your choice is ", answer);
    })
    .catch((error) => {
      throw error;
    });
}
