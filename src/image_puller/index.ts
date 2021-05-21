import { DuckDuckGoImage, image_search } from "duckduckgo-images-api";
import { curly, CurlyResult } from "node-libcurl";
import { spawnSync } from "child_process";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

/**
* This function gets image info from DuckDuckGo
* @param    query Query theme search 
* @returns  Promise<DuckDuckGoImage[]>
**/
export const getImageInfoPack = async (query: string): Promise<DuckDuckGoImage[]> => {

    const search_config = {
        query,
        moderate: (process.env.SAFE_MODE == "true") ? true : false,
        iterations: 3,
    };

    return await image_search(search_config);
}

/**
* This function will download an image
* @param    url URL where the image is downloaded
*
* @returns  Promise<CurlyResult<Buffer>>
**/
export const downloadImage = async (url: string): Promise<CurlyResult<Buffer>> => {
    return (await curly(url));
}

/**
 * This function will write an image from a Buffer
 * @param img   Image buffer
 * @param name  Image name to save
 * @param theme Theme of the image
 * 
 * @returns Promise<void>
 */
export const imageWriter = async (img: Buffer, theme: string, name: string): Promise<void> => {
    // ${name}.jpg
    const path: string = `./data/input/images/${theme}`;
    spawnSync("mkdir", ["-p", path]);
    fs.writeFileSync(`${path}/${name}.jpg`, img);
}
