import * as fs from 'fs'
import { Util } from './util.js';

export class DataReader {
    
    convertFileToArrayOfNumbers(fileName: string, separator:string="newLine") : number[] {
        let textByLine = this.convertFileToStringArray(fileName, separator);
        return Util.convertStringArrayToNumberArray(textByLine);
    }

    convertFileToStringArray(fileName: string, separator:string="newLine"): string[] {
        let data = fs.readFileSync(fileName).toString('utf-8');
        let splitChar = separator;
        if(separator === "newLine"){ 
            splitChar = this.determineNewLineChar(data);
        }
        let textByLine = data.split(splitChar);

        //check for empty last line
        if(textByLine[textByLine.length-1].length === 0) {
            textByLine.pop()
        }

        return textByLine;
    }

    private determineNewLineChar(data: string) {
        let newLineChar = "\n";
        if (data.includes("\r\n")){
            newLineChar = "\r\n";
        };

        return newLineChar;
    }
}