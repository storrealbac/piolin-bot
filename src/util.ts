import { spawnSync } from "child_process";
import { readFileSync } from "fs";

/**
 * This function will create the default proyect folders
 * 
 * @return void
 */
export const createDataFolders = (): void => {
    spawnSync("mkdir", ["-p", `./data/output/images`]);
    spawnSync("mkdir", ["-p", `./data/input/images/`]);
    spawnSync("touch", ["./data/input/names.txt"]);
    spawnSync("touch", ["./data/input/themes.txt"]);
}

/**
 * This function will return the lines from a config file
 * 
 * @return string[]
 */
export const getConfigLines = (file_name: string): string[]  => {
    const data: string = readFileSync(`./data/input/${file_name}`, "utf8");
    return data.split("\n");
}