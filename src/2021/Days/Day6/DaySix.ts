import { DataReader } from "../../../shared/dataReader.js";
import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface";

export class DaySix extends Day implements DayInterface{
    dayName = 'Day Six'
    dataReader = new DataReader();

    lanternFishes: number[] = []
    lanternFishSchools: number[] = []

    private tickDays(numDays: number) {
        this.prepareDataForPuzzle();
        this.instantiateSchools();

        let numDaysToTick = numDays;
        let dayIndex = 0;
        while(dayIndex < numDaysToTick) {
            let numFishToSpawn = this.lanternFishSchools[0];
            this.lanternFishSchools.shift();
          
            //spawn any new fish
            this.lanternFishSchools.push(numFishToSpawn);
            //reset any fish that spawned
            this.lanternFishSchools[6] += numFishToSpawn;

            dayIndex ++;
        }

        let totalFish = this.lanternFishSchools.reduce((prev, curr) => prev + curr)
        return totalFish;
    }

    partOne() {
        let totalFish = this.tickDays(80);
        console.log(`Day #80 TOTAL FISH ${totalFish}`)
        return Util.checkAnswer(totalFish, 345387)
    }

    partTwo() {
        let totalFish = this.tickDays(256);
        console.log(`Day #256 TOTAL FISH ${totalFish}`)
        return Util.checkAnswer(totalFish, 1574445493136)        
    }

    private instantiateSchools(){
    this.lanternFishes.forEach(fishAge => {
        this.lanternFishSchools[fishAge] ++;
    })
    }

    prepareDataForPuzzle(): void {
        this.lanternFishSchools = [0,0,0,0,0,0,0,0,0];
        this.lanternFishes = this.dataReader.convertFileToArrayOfNumbers("src/2021/inputFiles/daySixInput.txt", ",");
    }
    
}