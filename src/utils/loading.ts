import loading, { Options, Loading } from "loading-cli";

export class Load {
  load: null | Loading;
  constructor() {
    this.load = null;
  }
  /**
   * 开始loading
   */
  start(options: Options | string) {
    if (!this.load) {
      if (typeof options === "object" && !options.frames) {
        options.frames = ["\\", "|", "/", "|"];
      }
      this.load = loading(options).start();
    } else {
      this.load.start(options as string);
    }
  }

  /**
   * 停止loading
   */
  stop() {
    this.load && this.load.stop();
  }
  /**
   * 警告信息
   */
  warn(text: string) {
    this.load && this.load.warn(text);
  }
  /**
   * 提示信息
   */
  info(text: string) {
    this.load && this.load.info(text);
  }
}
