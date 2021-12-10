import { DirectionReader } from "./directionReader.js";
import { Util } from "../../shared/util.js";
import { Day } from "../Day.js";
import { DayInterface } from "../DayInterface.js";

export class DayTwo extends Day implements DayInterface {
    dayName = 'Day Two'

    directionReader = new DirectionReader();
    directionReadings:string[] = [];
    
    partOne() {

        this.prepareDataForPuzzle();
        let pos = this.determinePosition(false);

        let solution = this.calcAnswer(pos);
        return Util.checkAnswer(solution, 1924923);
    }

    partTwo() {
        this.prepareDataForPuzzle();
        let pos = this.determinePosition(true);

        let solution = this.calcAnswer(pos);
        return Util.checkAnswer(solution, 1982495697);
    }

    private determinePosition(useAim:boolean) {
        let hPos = 0;
        let vPos = 0;
        let aim = 0;

        this.directionReadings.forEach(direction => {
            let dir = this.directionReader.getDir(direction);
            let distance = this.directionReader.getDistance(direction);
            switch (dir) {
                case 'forward':
                    hPos += distance;
                    if (useAim){
                        vPos += aim * distance
                    }
                    break;
                case 'up':
                    if (useAim) {
                        aim = aim - distance;
                    } else {
                        vPos = vPos - distance;
                    }
                    break;
                case 'down':
                    if (useAim) {
                        aim += distance;
                    } else {
                        vPos += distance;
                    }
                    break;
            }
        })

        return [hPos, vPos];
    }

    private calcAnswer(position: number[]): number {
        let hPos = position[0];
        let vPos = position[1];
        let mult = hPos * vPos;

        console.log(`horizontal = ${hPos}, vertical = ${vPos}, mult = ${mult}`)

        return mult;
    }

    prepareDataForPuzzle() {
        if (this.directionReadings.length === 0){
            this.directionReadings = this.dataReader.convertFileToStringArray("inputFiles/dayTwoInput.txt");
        }
    }

}