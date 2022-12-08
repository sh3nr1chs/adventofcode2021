import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";
import { Util } from "../../../shared/util.js";

export class DayEight extends Day implements DayInterface {
    dayName: string = '2022 Day Eight';

    treeMap: Array<number[]> = [];




    partOne() {
        this.prepareDataForPuzzle();
  

        let totalSizeForSmallDirectories = 0;
   
        console.log(`The total size of all directories < 100000 is ${totalSizeForSmallDirectories}`);
     
        return Util.checkAnswer(totalSizeForSmallDirectories, 2031851);
    }

   
    prepareDataForPuzzle() {
        this.treeMap = this.dataReader.convertFileToArrayOfNumberArrays("src/2022/inputFiles/test.txt")
    }

    

}