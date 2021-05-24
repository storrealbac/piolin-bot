import { captionImage, cropAndResizeImage, createCoverPage } from "./generator";
import { getImageInfoPack, downloadImage, imageWriter } from "./image_puller";
import dotenv from "dotenv";
import { 
    createDataFolders, 
    getConfigLines, 
    getRandomNumber, 
    getRandomThemeAndRemove, 
    randomNumbersArray, 
    deleteFolder,
    existData,
    isIgnoredWebsite
} from "./util";
import { bgRedBright, bgYellowBright, bold, options, bgGreenBright, bgBlueBright } from "colorette";
import { DuckDuckGoImage } from "duckduckgo-images-api";
import { CurlyResult } from "node-libcurl";

// create default folders
createDataFolders();
dotenv.config();
options.enabled = (process.env.TERMINAL_COLORS == "true") ? true : false;

if (!existData(process.env.NAME_LIST||"names.txt")) {
    console.log(`${bgRedBright(`${bold(" ERROR ")}`)} There is nothing in the ${bold("name")} file`);
    process.exit();
} 

if (!existData(process.env.THEMES_LIST||"themes.txt")) {
    console.log(`${bgRedBright(`${bold(" ERROR ")}`)} There is nothing in the ${bold("theme")} file`);
    process.exit();
} 

const theme: string = getRandomThemeAndRemove();
const info_pack = getImageInfoPack(theme);

const list_name: string[] = getConfigLines(process.env.NAME_LIST||"names.txt");

info_pack.then( async (res) => {

    let coverpage_download = await downloadImage(res[getRandomNumber(0, 300)].image);
    console.log(`${bgYellowBright(`${bold(" TRYING ")}`)} Downloading ${bold(theme)} cover page.`);

    // Create cover page image & crop & resize
    while(true) {
        // if something wrong with the download, re-download
        if (coverpage_download.statusCode != 200) {
            coverpage_download = await downloadImage(res[getRandomNumber(0, 300)].image);
            console.log(`${bgYellowBright(`${bold(" TRYING ")}`)} Re-downloading ${bold(theme)} cover page.`);
        } else break;
    }
    console.log(`${bgGreenBright(`${bold(" SUCCESSFUL ")}`)} Downloaded ${bold("COVER_PAGE.JPG")} image from ${bold(theme)} theme.`);
    console.log(`${bgYellowBright(`${bold(" TRYING ")}`)} Writing ${bold(theme)} cover page.`);
    imageWriter(coverpage_download.data, theme, "COVER_PAGE");

    console.log(`${bgYellowBright(`${bold(" TRYING ")}`)} Cropping & Resizing ${bold(theme)} cover page.`);
    cropAndResizeImage("COVER_PAGE", theme);

    console.log(`${bgYellowBright(`${bold(" TRYING ")}`)} Creating ${bold(theme)} cover page.`);
    createCoverPage(theme);

    console.log(`${bgGreenBright(`${bold(" STARTING ")}`)} Generating random numbers set.`);
    const random_array: number[] = randomNumbersArray(0, 100, list_name.length);
    random_array.forEach( async (random_number: number, i: number) => {

        let download_info: DuckDuckGoImage = res[random_number];

        let download: CurlyResult<Buffer>;
        try {
            download = await downloadImage(download_info.image);
            console.log(`${bgYellowBright(`${bold(" TRYING ")}`)} Downloading ${bold(list_name[i])} image from ${bold(theme)} theme.`);
            while(true) {
                // if something wrong with the download, re-download
                if (download.statusCode != 200 || isIgnoredWebsite(download_info.url)) {
                    download = await downloadImage(res[getRandomNumber(0, 100)].image);
                    console.log(`${bgYellowBright(`${bold(" TRYING ")}`)} Re-downloading ${bold(list_name[i])} image from ${bold(theme)} theme.`);
                } else break;
            }

            // Save the image
            console.log(`${bgGreenBright(`${bold(" SUCCESSFUL ")}`)} Downloaded ${bold(list_name[i])} image from ${bold(theme)} theme.`);
            
            console.log(`${bgYellowBright(`${bold(" TRYING ")}`)} Writing ${bold(list_name[i])} image from ${bold(theme)} theme.`);
            imageWriter(download.data, theme, list_name[i]);
            
            console.log(`${bgYellowBright(`${bold(" TRYING ")}`)} Cropping & Resizing ${bold(list_name[i])} image from ${bold(theme)} theme.`);
            cropAndResizeImage(list_name[i], theme);
            
            console.log(`${bgYellowBright(`${bold(" TRYING ")}`)} Putting captions ${bold(list_name[i])} image from ${bold(theme)} theme.`);
            captionImage(list_name[i], theme, list_name[i]);

        } catch(e) {
            console.log(`${bgRedBright(`${bold(" ERROR ")}`)} There was an error downloading an image, ignoring image`);
        }

    });

    // deleting (finishing process)
    console.log(`${bgBlueBright(`${bold(" FINISHED ")}`)} Removing ${bold("input")} & ${bold("cropped")} folders.`);
    deleteFolder(`/input/images/${theme}`);
    deleteFolder(`/cropped/images/${theme}`);

});