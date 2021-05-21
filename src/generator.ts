import { spawnSync } from "child_process";
import dotenv from "dotenv";
dotenv.config();

/**
* This function will create a image with captions
* @param image Name of the original image
* @param theme Theme name
* @param text  Caption text
**/
export const captionImage = async (image: string, theme: string, text: string): Promise<void> => {
    spawnSync("./dist/processor/caption.sh", ["-i", `./data/cropped/images/${theme}/${image}.jpg`, "-c", text, "-o", `./data/output/images/${theme}/${text}.jpg`]);
}

/**
 * This function will crop and resize the image
 * @param name  File name
 * @returns void
 */
export const cropAndResizeImage = async (name: string, theme: string): Promise<void> => {
    const path: string = `./data/input/images/${theme}/${name}.jpg`;
    const out: string = `./data/cropped/images/${theme}/${name}.jpg`;
    spawnSync("mkdir", ["-p", `./data/cropped/images/${theme}`]);
    spawnSync("./dist/processor/resize.sh", ["-i", path, "-o", out]);
}

/**
 * Create cover image from COVER_PAGE.jpg file
 * @param theme Theme name
 * @param image Image path
 */
export const createCoverPage = (theme: string) => {
    const text: string = process.env.COVER_PAGE_TEXT_TEMPLATE||"What kind of %theme% are you?";
    spawnSync("mkdir", ["-p", `./data/output/images/${theme}`]);
    spawnSync("./dist/processor/cover.sh", ["-i", `./data/cropped/images/${theme}/COVER_PAGE.jpg`, "-t", `${text.replace("%theme%", theme)}`, "-o", `./data/output/images/${theme}/COVER_PAGE.jpg`]);
}