import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";

export class DayOne extends Day implements DayInterface {
    
    dayName = '2022 Day One'   
    calorieCounts:number[] = [];

    partOne() {
        this.prepareDataForPuzzle();
        
        let sortedCaloriesByElf = this.countAndSortCaloriesForEachElf();
        let mostCalories = sortedCaloriesByElf[0];

        console.log(`The elf carrying the most calories is carrying ${mostCalories} calories.`);
        return Util.checkAnswer(mostCalories, 67450);
    }

    partTwo() {
        this.prepareDataForPuzzle();

        let sortedCaloriesByElf = this.countAndSortCaloriesForEachElf();
        let topThreeCalCounts = sortedCaloriesByElf[0] + sortedCaloriesByElf[1] + sortedCaloriesByElf[2];

        console.log(`The top three elves are carrying ${topThreeCalCounts} calories total.`);

        return Util.checkAnswer(topThreeCalCounts, 199357);
    }

    private countAndSortCaloriesForEachElf(): number[] {
        let currentElfCalories = 0;
        let packs: number[] = [];

        this.calorieCounts.forEach(caloricEntry => {
            if (isNaN(caloricEntry) ) {
                packs.push(currentElfCalories);
                currentElfCalories = 0;
            } else {
                currentElfCalories += caloricEntry;
            }
        })

        packs.sort((n1,n2) => n2 - n1);
        return packs;
    }

    prepareDataForPuzzle() {
        if (this.calorieCounts.length === 0){
            this.calorieCounts = this.dataReader.convertFileToArrayOfNumbers("src/2022/inputFiles/DayOneInput.txt");
        }
    }
}