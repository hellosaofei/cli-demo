import { exec } from "child_process";
import { fileUtil, chalkUtil, loadingUtil } from "../../utils";
import { repo_url, repo_name } from "../../config";
import path from "path";
import inquirer from "inquirer";
const loading = new loadingUtil.Load();
interface template_choice_item {
  name?: string;
  value?: string | number;
}
const askForTemplate = (templateChoices: template_choice_item[]) => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "template",
          message: "选择一个模板",
          choices: templateChoices,
        },
      ])
      .then((answer) => {
        resolve(answer.template);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default async function (projectName, cmd) {
  const project_path = path.join(process.cwd(), projectName);
  try {
    // 判断得到的路径是否存在
    const is_path_exist = await fileUtil.isExist(project_path);
    // 如果不存在，直接创建即可
    if (!is_path_exist) {
      await fileUtil.mkDir(project_path);
    } else {
      // 如果存在
      // 如果强制操作 --force
      console.log(cmd);
      if (cmd.force) {
        // 1. 删除已有的目录
        await fileUtil.rmDir(project_path);
        // 2. 创建新的目录
        await fileUtil.mkDir(project_path);
      } else {
        // 如果不强制删除，抛出错误
        throw new Error(
          `${project_path} Path already exists,Add ${chalkUtil.Cgreen(
            "--force"
          )} configuration item can be forcibly deleted `
        );
      }
    }
    // 代码到这里，能够保证，用户想要创建的目录已经存在，下面开始拉取模板并生成
    //  写入模板文件
    loading.start("正在下载模板...");
    // 注意：执行git clone 之后，拉取得到的模板文件直接复制在了项目的根目录下
    exec(`git clone ${repo_url}`, async (err) => {
      if (err) {
        console.error(err);
      }
      loading.stop();
      // 找到拉取得到的模板路径
      const templatePath = path.resolve(process.cwd(), repo_name);
      // 拼接得到project.json文件的路径
      const projectJsonPath = path.resolve(templatePath, "project.json");
      const projectJson = await fileUtil.readFile(projectJsonPath);
      console.log(projectJson);
      const user_template_choice = await inquirer
        .prompt([
          {
            type: "list",
            name: "template",
            message: "选择一个模板",
            choices: [
              {
                name: "vue3-template",
                value: "vue3-template",
              },
              {
                name: "vue3-template-admin",
                value: "vue3-template-admin",
              },
            ],
          },
        ])
        .then((answer) => {
          return answer.template;
        })
        .catch((error) => {
          console.error(error);
        });

      // 拿到用户的选择之后，找到用户想要的模板文件，copy下来
      // 然后复制到用户自己命名的project中
      loading.start("正在生成模板...");
      const newPath = project_path;
      // @ts-ignore
      const oldPath = path.resolve(templatePath, user_template_choice);

      await fileUtil.copyDir(oldPath, newPath);
      await fileUtil.rmDir(templatePath);
      loading.stop();
    });
  } catch (e) {
    console.error(e);
  }
}
