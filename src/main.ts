import { captionImage, cropAndResizeImage } from "./generator";
import { getImageInfoPack, downloadImage, imageWriter } from "./image_puller";

import { 
    createDataFolders, 
    getConfigLines, 
    getRandomNumber, 
    getRandomThemeAndRemove, 
    randomNumbersArray, 
    deleteFolder 
} from "./util";

// create default folders
createDataFolders();

// Proof of concept
const theme: string = getRandomThemeAndRemove();
const info_pack = getImageInfoPack(theme);

const list_name: string[] = getConfigLines("names.txt");

info_pack.then( async (res) => {
    const random_array: number[] = randomNumbersArray(0, res.length, list_name.length);
    
    random_array.forEach( async (random_number: number, i: number) => {
        let download = await downloadImage(res[random_number].image);

        while(true) {
            // if something wrong with the download, re-download
            if (download.statusCode != 200)
                download = await downloadImage(res[getRandomNumber(0, 100)].image);
            else break;
        }

        // Save the image
        imageWriter(download.data, theme, list_name[i]);
        cropAndResizeImage(list_name[i], theme);
        captionImage(list_name[i], theme, list_name[i]);
        deleteFolder(`/input/images/${theme}`);
        deleteFolder(`/cropped/images/${theme}`);
        
    });
});
