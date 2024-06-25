import fs from "fs";
import { Cred } from "./chalk";

export const readDir = (path: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.readdir(path, (err) => {
      if (err) {
        reject(Cred("readDir Error"));
      }
      resolve("");
    });
  });

export const mkDir = (path: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if (err) {
        reject(Cred("mkDir Error"));
      }
      resolve("");
    });
  });
