import { count } from "console";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";
import { Util } from "../../../shared/util.js";
import { PairAssignment } from "./PairAssignment.js";
import { PairAssignmentReader } from "./PairAssignmentReader.js";

export class DayFour extends Day implements DayInterface {
    dayName: string = '2022 Day Four';
    pairAssignmentReader = new PairAssignmentReader(this.dataReader);
    pairAssignments:PairAssignment[] = [];

    partOne() {
        this.prepareDataForPuzzle();
        let count = this.countPairsWithFullOverlap();

        console.log(`${count} assignment pairs have assignments that are fully overlapped.`)
        return Util.checkAnswer(count, 518);
    }

    partTwo() {
        this.prepareDataForPuzzle();
        let count = this.countPairsWithAnyOverlaps();

        console.log(`${count} assignment pairs have assignments that contain any overlap at all.`)
        return Util.checkAnswer(count, 909);
    }

    prepareDataForPuzzle() {
        if (this.pairAssignments.length === 0){
            this.pairAssignments = this.pairAssignmentReader.readPairAssignments("src/2022/inputFiles/DayFourInput.txt");
        }
    }

    countPairsWithFullOverlap() {
        let count = 0;
        this.pairAssignments.forEach(pairAssignment => {
          
            if (this.isRangeWithinRange(pairAssignment.pairOne, pairAssignment.pairTwo) 
                || this.isRangeWithinRange(pairAssignment.pairTwo, pairAssignment.pairOne)){
                count++;
            }
        })

        return count;
    }

    countPairsWithAnyOverlaps() {
        let count = 0;
        this.pairAssignments.forEach(pairAssignment => {
           if (this.isSingleValueWithinRange(pairAssignment.pairOne[0], pairAssignment.pairTwo) 
           || this.isSingleValueWithinRange(pairAssignment.pairOne[1], pairAssignment.pairTwo)
           || this.isSingleValueWithinRange(pairAssignment.pairTwo[0], pairAssignment.pairOne)
           || this.isSingleValueWithinRange(pairAssignment.pairTwo[1], pairAssignment.pairOne) ) {
               count++;
           }
        })

        return count;
    }

    isRangeWithinRange(rangeOne: number[], rangeTwo: number[]) {
      return this.isSingleValueWithinRange(rangeOne[0], rangeTwo) 
      && this.isSingleValueWithinRange(rangeOne[1], rangeTwo);  
    }

    isSingleValueWithinRange(value: number, range:number[]) {
        return value >= range[0] && value <= range[1];
    }   

}