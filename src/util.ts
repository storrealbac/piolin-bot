import { spawnSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

/**
 * This function will create the default proyect folders
 * 
 * @return void
 */
export const createDataFolders = (): void => {
    spawnSync("mkdir", ["-p", `./data/input/images/`]);
    spawnSync("mkdir", ["-p", `./data/cropped/images/`]);
    spawnSync("mkdir", ["-p", `./data/output/images`]);
}
/**
 * This function will return the lines from a config file
 * 
 * @return string[]
 */
export const getConfigLines = (file_name: string): string[]  => {
    const data: string = readFileSync(`./${file_name}`, "utf8");
    return data.split("\n");
}

/**
 * 
 * @param min   Minimal value of random interval
 * @param max   Maximum value of random interval
 * @param size  Size of randoms numbers on the array
 */
export const randomNumbersArray = (min: number, max: number, size: number): number[] => {

    let numbers: Set<number> = new Set<number>();

    for (let i = 0; i < size;) {
        const generated_number = Math.floor(Math.random() * (max-min))+min;
        if (!numbers.has(generated_number)) {
            numbers.add(generated_number);
            i++
        }
    }

    return Array.from(numbers);
}
/**
 * This function get a random theme and delete it in the file
 * @return string
 */
export const getRandomThemeAndRemove = (): string => {
    let data: string[] = getConfigLines(`./${process.env.THEMES_LIST}`);
    const theme_number: number = getRandomNumber(0, data.length);
    const theme = data[theme_number];
    data.splice(theme_number, 1);
    writeFileSync(`./${process.env.THEMES_LIST}`, data.join("\n"), "utf-8");
    return theme;
}

/**
 * This function will return a random number
 * @param min   Minimal value of random interval
 * @param max   Maximum value of random interval
 */
export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max-min))+min;
}

/**
 * This function will return if exist lines in the file
 * @param file_path Path where the file is saved
 */
export const existData = (file_path: string) => {
    const file: string[] = getConfigLines(file_path);
    return (file.length == 1 && file[0] == "") ? false : true
}

/**
 * This function will delete a theme folder
 * @param folder_path Folder name inside ./data
 */
export const deleteFolder = (folder_path: string): void => {
    spawnSync("rm", ["-rf", `./data/${folder_path}`]);
}

/**
 * This function return if the img source is blocked
 * @param url   URL to compare
 */
export const isIgnoredWebsite = (url: string): boolean => {
    const websites_url: string[] = getConfigLines(process.env.IGNORED_WEBSITES||"ignorewebsites.txt");
    websites_url.forEach( (_url: string) => {
        if (url == _url) return true;
    });
    return false;
}