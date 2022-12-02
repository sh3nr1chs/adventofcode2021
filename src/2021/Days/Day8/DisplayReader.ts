import { DataReader } from "../../../shared/dataReader.js";
import { SpecializedDataReader } from "../../../shared/SpecializedDataReader.js";
import { Display } from "./Display.js";

export class DisplayReader extends SpecializedDataReader {
    constructor(dataReader: DataReader){
        super(dataReader);
   }

   private alphabetizeIndividualDigitsInList(unalphabetizedDigitArray: string[]): string[] {
       let alphaDigitArray: string[] = [];
       unalphabetizedDigitArray.forEach((unalphabetizedDigit, digitIndex) => {
        alphaDigitArray[digitIndex] = unalphabetizedDigit.split('').sort().join('');
       })

       return alphaDigitArray;   
   }

   readDisplayNotes(fileName:string): Display[] {
    let displays: Display[]= [];
    let displayInputStrings:string[] = this.dataReader.convertFileToStringArray(fileName);
    displayInputStrings.forEach(displayInputString => {
        let notes: string[] = displayInputString.split(' | ');
        let observedDigits = notes[0].split(" ");
        let outputDigits = notes[1].split(" ");
        displays.push(new Display(this.alphabetizeIndividualDigitsInList(observedDigits), this.alphabetizeIndividualDigitsInList(outputDigits)))
    })

    return displays;
   }
}