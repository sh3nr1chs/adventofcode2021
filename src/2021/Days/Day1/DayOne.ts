import { DepthFinder } from "./depthFinder.js";
import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface";

export class DayOne extends Day implements DayInterface {
    dayName = 'Day One'

    depthFinder = new DepthFinder();
    
    depthReadings:number[] = [];

    partOne() {
        this.prepareDataForPuzzle();

        let count = this.countIncreases(this.depthReadings);
        
        console.log(`Number of times it got deeper: ${count}`);
        return Util.checkAnswer(count, 1228);
    }

    partTwo() {
        this.prepareDataForPuzzle();

        let threeMeasurementWindowData = this.depthFinder.generateThreeMeasurementWindowData(this.depthReadings);
        let count = this.countIncreases(threeMeasurementWindowData);

        console.log(`Number of times it got deeper using a three measurement window: ${count}`);
        return Util.checkAnswer(count, 1257);
    }

    private countIncreases(readings:number[]) {
        let count = 0;
        readings.forEach((reading, index) => {
            let prevReading = readings[index-1];
            if (index > 0 && this.depthFinder.isDeeper(prevReading, reading)) {
                count++;
            }
        })

        return count;
    }

    prepareDataForPuzzle() {
        if (this.depthReadings.length === 0){
            this.depthReadings = this.dataReader.convertFileToArrayOfNumbers("src/2021/inputFiles/dayOneInput.txt");
        }
    }
}