import { spawnSync } from "child_process";

/**
* This function will create a image with captions
* @param image Name of the original image
* @param theme Theme name
* @param text  Caption text
**/
export const captionImage = async (image: string, theme: string, text: string): Promise<void> => {
    spawnSync("mkdir", ["-p", `./data/output/images/${theme}`]);
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