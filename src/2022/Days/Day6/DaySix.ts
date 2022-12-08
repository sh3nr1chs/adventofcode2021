import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";
import { Util } from "../../../shared/util.js";

export class DaySix extends Day implements DayInterface {
    dayName: string = '2022 Day Six';
    characters: string[] = [];

    partOne() {
        this.prepareDataForPuzzle();
        let charsToBeProcessed = this.findStartOfPacket(4);
        console.log(`${charsToBeProcessed} characters need to be processed before the first start of packet marker.`);
     
        return Util.checkAnswer(charsToBeProcessed, 1538);
    }

    partTwo() {
        this.prepareDataForPuzzle();
    
        let charsToBeProcessed = this.findStartOfPacket(4) + this.findStartOfPacket(14);
        console.log(`${charsToBeProcessed} characters need to be processed before the first start of message marker.`);
     
        return Util.checkAnswer(charsToBeProcessed, 2315);
    }

   
    prepareDataForPuzzle() {
        this.characters = this.dataReader.convertFileToStringArray("src/2022/inputFiles/DaySixInput.txt", "");
    }

    findStartOfPacket(maxCharacters: number) {
        let foundStart = false;
        let currentCharacters = [];
        let count = 0;

        while(!foundStart) {
            count++;

            currentCharacters.push(this.characters.shift());
            if (currentCharacters.length === maxCharacters) {
                //check for dups
                let set = new Set(currentCharacters);
                if (set.size === maxCharacters){
                    foundStart = true
                } else {
                    currentCharacters.shift();
                }
            }
        }

        return count;
    }



   

}