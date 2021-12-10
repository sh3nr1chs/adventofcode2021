import { Util } from "../../shared/util.js";
import { Day } from "../Day.js";
import { DayInterface } from "../DayInterface.js";
import { Display } from "./Display.js";
import { DisplayReader } from "./DisplayReader.js";

export class DayEight extends Day implements DayInterface {
    dayName: string = "Day Eight";

    displayReader = new DisplayReader(this.dataReader);

    displays: Display[] = [];

    partOne() {
        this.prepareDataForPuzzle();

        let countOneFourSevenAndEights = 0;
        this.displays.forEach(display => {
            display.output.forEach(outputDigit => {
                let outputDigitSize = outputDigit.length;
                if (outputDigitSize === 2 || outputDigitSize === 3 || outputDigitSize === 4 || outputDigitSize === 7) {
                    countOneFourSevenAndEights ++;
                }
            })
        })

        console.log(`Number of 1s, 4s, 7s, & 8s in the output: ${countOneFourSevenAndEights}`)
        return Util.checkAnswer(countOneFourSevenAndEights, 321)
    }

    partTwo(){
        this.prepareDataForPuzzle();
        
        let total = 0;
        this.displays.forEach(display => {
            total += display.identifyOutput();
        })

        console.log(`Total for all outputs: ${total}`)
        return Util.checkAnswer(total, 1028926)
    }

    prepareDataForPuzzle() {
        if (this.displays.length === 0) {
            this.displays = this.displayReader.readDisplayNotes("inputFiles/dayEightInput.txt")
        } else {
            this.displays.forEach(display => display.reset())
        }
    }

}