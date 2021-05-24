import { captionImage, cropAndResizeImage, createCoverPage } from "./generator";
import { getImageInfoPack, downloadImage, imageWriter } from "./image_puller";
import dotenv from "dotenv";
import { 
    createInitialConfig, 
    getConfigLines, 
    getRandomNumber, 
    getRandomThemeAndRemove, 
    randomNumbersArray, 
    deleteFolder,
    existData,
    isIgnoredWebsite
} from "./util";
import { bold, options } from "colorette";
import { tryingLog, startingLog, successfullLog, errorLog, finishedLog } from "./logs";
import { DuckDuckGoImage } from "duckduckgo-images-api";
import { CurlyResult } from "node-libcurl";

// create default files
createInitialConfig();
dotenv.config();
options.enabled = (process.env.TERMINAL_COLORS == "true") ? true : false;

if (!existData(process.env.NAME_LIST||"names.txt")) {
    errorLog(`There is nothing in the ${bold("name")} file`);
    process.exit();
} 

if (!existData(process.env.THEMES_LIST||"themes.txt")) {
    errorLog(`There is nothing in the ${bold("theme")} file`);
    process.exit();
} 

const theme: string = getRandomThemeAndRemove();
const info_pack = getImageInfoPack(theme);

const list_name: string[] = getConfigLines(process.env.NAME_LIST||"names.txt");

info_pack.then( async (res) => {

    let coverpage_download = await downloadImage(res[getRandomNumber(0, 300)].image);
    tryingLog(`Downloading ${bold(theme)} cover page.`);

    // Create cover page image & crop & resize
    while(true) {
        // if something wrong with the download, re-download
        if (coverpage_download.statusCode != 200) {
            coverpage_download = await downloadImage(res[getRandomNumber(0, 300)].image);
            tryingLog(`Re-downloading ${bold(theme)} cover page.`);
        } else break;
    }
    successfullLog(`Downloaded ${bold("COVER_PAGE.JPG")} image from ${bold(theme)} theme.`);
    tryingLog(`Writing ${bold(theme)} cover page.`);

    imageWriter(coverpage_download.data, theme, "COVER_PAGE");
    tryingLog(`Cropping & Resizing ${bold(theme)} cover page.`);
    cropAndResizeImage("COVER_PAGE", theme);

    tryingLog(`Creating ${bold(theme)} cover page.`);
    createCoverPage(theme);

    startingLog(`Generating random numbers set.`);
    const random_array: number[] = randomNumbersArray(0, 100, list_name.length);

    const downloads_promises: Promise<null> = new Promise( (resolve, reject) =>  {
        
        let task_counter: number = 0;
        random_array.forEach( async (random_number: number, i: number) => {

            let download_info: DuckDuckGoImage = res[random_number];
            let download: CurlyResult<Buffer>;

            try {
                download = await downloadImage(download_info.image);
                tryingLog(`Downloading ${bold(list_name[i])} image from ${bold(theme)} theme.`);
                while(true) {
                    // if something wrong with the download, re-download
                    if (download.statusCode != 200 || isIgnoredWebsite(download_info.url)) {
                        download = await downloadImage(res[getRandomNumber(0, 100)].image);
                        tryingLog(`Re-downloading ${bold(list_name[i])} image from ${bold(theme)} theme.`);
                    } else break;
                }
    
                // Save the image
                successfullLog(`Downloaded ${bold(list_name[i])} image from ${bold(theme)} theme.`);
                
                tryingLog(`Writing ${bold(list_name[i])} image from ${bold(theme)} theme.`);
                imageWriter(download.data, theme, list_name[i]);
                
                tryingLog(`Cropping & Resizing ${bold(list_name[i])} image from ${bold(theme)} theme.`);;
                cropAndResizeImage(list_name[i], theme);
                
                tryingLog(`Putting captions ${bold(list_name[i])} image from ${bold(theme)} theme.`);
                captionImage(list_name[i], theme, list_name[i]);
    
            } catch(e) {errorLog("There was an error downloading an image, ignoring image");}
    
            task_counter++; //Add one to it if you finished the whole download/crop/caption process
            if(task_counter == random_array.length) resolve(null);
        });

    });
    
    // When the program finishes downloading the images, delete the previous ones
    downloads_promises.then( () => {
        // deleting (finishing process)
        finishedLog(`Removing ${bold("input")} & ${bold("cropped")} folders.`);
        deleteFolder(`/input/images/${theme}`);
        deleteFolder(`/cropped/images/${theme}`);
    });

});