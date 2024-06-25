import fs from "fs";
import { Cred } from "./chalk";

/**
 * 用于判断目录或者文件是否存在
 * @param path
 * @returns
 */
export const isExist = (path: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        // 文件或者目录不存在
        if (err.code === "ENOENT") {
          resolve(false);
        } else {
          // 其他错误
          reject(err);
        }
      }
      resolve(true);
    });
  });
/**
 * 用于创建一个目录
 * @param path
 * @returns
 */
export const mkDir = (path: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if (err) {
        reject(Cred("mk Dir Error"));
      }
      resolve("");
    });
  });
/**
 * 用于删除一个目录
 * @param path
 * @returns
 */
export const rmDir = (path: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.rm(path, { recursive: true }, (err) => {
      if (err) {
        reject(Cred("remove Dir Error"));
      }
      resolve("");
    });
  });

/**
 * 用于读取一个文件
 * @param path
 * @returns
 */
export const readFile = (path: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
/**
 * 用于复制一个文件
 * @param oldPath
 * @param newPath
 * @returns
 */
export const copyDir = (oldPath: string, newPath: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.cp(oldPath, newPath, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      }
      resolve("");
    });
  });
