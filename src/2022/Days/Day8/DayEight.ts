import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";
import { Util } from "../../../shared/util.js";
import { TreeAnalyzer } from "./TreeAnalyzer.js";

export class DayEight extends Day implements DayInterface {
    dayName: string = '2022 Day Eight';
    treeAnalyzer!: TreeAnalyzer;

    treeMap: Array<number[]> = [];

    partOne() {
        this.prepareDataForPuzzle();
        let totalVisibleTrees = this.treeAnalyzer.countVisibleTrees();
  
        console.log(`The total number of visible trees is ${totalVisibleTrees}`);
     
        return Util.checkAnswer(totalVisibleTrees, 1538);
    }

    partTwo() {
        this.prepareDataForPuzzle();
        let maxScenicScore = this.treeAnalyzer.getMaxScenicScore();
  
        console.log(`The maximum scenic score is ${maxScenicScore}`);
     
        return Util.checkAnswer(maxScenicScore, 496125);
    }

    prepareDataForPuzzle() {
        this.treeMap = this.dataReader.convertFileToArrayOfNumberArrays("src/2022/inputFiles/DayEightInput.txt")
        this.treeAnalyzer = new TreeAnalyzer(this.treeMap);
    }
    
}