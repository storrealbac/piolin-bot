import { spawn } from "child_process";

/**
* This function will create a image with captions
* @param image Name of the original image
* @param theme Theme name
* @param text  Caption text
**/
export const captionImage = (image: string, theme: string, text: string): void => {
    spawn("mkdir", ["-p", `./data/output/images/${theme}`]);
    spawn("./dist/processor/caption.sh", ["-i", `./data/input/images/${theme}/${image}`, "-c", text, "-o", `./data/output/images/${theme}/${text}.jpg`]);
}
