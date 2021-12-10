import { DataReader } from "../shared/dataReader.js";

export class Day {
    dataReader: DataReader = new DataReader();
    numCorrect = 0;

    solvePuzzlesForDay(dayName:string) {
        console.log('~~~~~~~~~~~~~~')
        
        console.log(`${dayName}, Pt1`)
        if(this.partOne()) {
            this.numCorrect ++;
        };
        console.log(`${dayName}, Pt2`)
        if(this.partTwo()) {
            this.numCorrect ++;
        };

        console.log('~~~~~~~~~~~~~~')
    }

    partOne(): boolean{
        throw Error("Implement Part One");
    }

    partTwo(): boolean{
        throw Error("Implement Part Two");
    }
}