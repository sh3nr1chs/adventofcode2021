import { Day } from "../Day.js";
import { DayInterface } from "../DayInterface.js";

export class DayTen extends Day implements DayInterface {
    dayName: string = "Day Ten"

    partOne(): boolean {
        return false;
    }

    partTwo(): boolean {
        return false;
    }
    
    prepareDataForPuzzle() {
        throw new Error("Method not implemented.");
    }

}