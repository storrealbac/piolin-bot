import { bgRedBright, bgYellowBright, bold, options, bgGreenBright, bgBlueBright } from "colorette";

export const errorLog = (msg: string) => {
    console.log(`${bgRedBright(`${bold(" ERROR ")}`)} ${msg}`);
}

export const tryingLog = (msg: string) => {
    console.log(`${bgYellowBright(`${bold(" TRYING ")}`)} ${msg}`);
}

export const successfullLog = (msg: string) => {
    console.log(`${bgGreenBright(`${bold(" SUCCESSFUL ")}`)} ${msg}`);
}

export const startingLog = (msg: string) => {
    console.log(`${bgGreenBright(`${bold(" STARTING ")}`)} ${msg}`);
}

export const finishedLog = (msg: string) => {
    console.log(`${bgBlueBright(`${bold(" FINISHED ")}`)} ${msg}`);
}