import { loadingUtil } from "../../utils";

const loading = new loadingUtil.Load();

export default function () {
  loading.start({
    color: "red",
    text: "begin",
  });
  setTimeout(() => {
    loading.stop();
    console.log("loading效果展示完毕");
  }, 3000);
}
