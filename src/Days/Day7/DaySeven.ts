import { Util } from "../../shared/util.js";
import { Day } from "../Day.js";
import { DayInterface } from "../DayInterface.js";

export class DaySeven extends Day implements DayInterface {
    dayName: string = 'Day Seven';

    crabPositions: number[] = [];

    private determineFuelCostForDistance(useSimpleCostCalculation: boolean, distance: number){
        if (useSimpleCostCalculation) {
            return distance;
        } else {
            //hey look!  a wild formula appears - this calculates the sum of the integers from 1 to distance
            let totalFuelCostForDistance = distance * (distance + 1) / 2;
            return totalFuelCostForDistance
        }
    }

    private getCheapestAlignment(useSimpleCostCalculation: boolean) {
        let cheapestAlignmentCost = Number.MAX_SAFE_INTEGER;
        let cheapestAlignmentPos = 0;

        let furthestHorizontalCrab = Math.max(...this.crabPositions);
        let closestHorizontalCrab = Math.min(...this.crabPositions);

        let posIndex = closestHorizontalCrab;
        while (posIndex <= furthestHorizontalCrab) {
            let totalFuelCostForPos = 0;
            this.crabPositions.forEach((crabPos) => {
                let distance = Math.abs(crabPos - posIndex);
                totalFuelCostForPos += this.determineFuelCostForDistance(useSimpleCostCalculation, distance);
            })
            if (totalFuelCostForPos < cheapestAlignmentCost) {
                cheapestAlignmentCost = totalFuelCostForPos;
                cheapestAlignmentPos = posIndex;
            }
            posIndex++;
        }

        return [cheapestAlignmentPos, cheapestAlignmentCost];
    }

    partOne() {
        this.prepareDataForPuzzle();
    
        let solution = this.getCheapestAlignment(true)
        console.log(`Align Crabs @ position ${solution[0]}, costs ${solution[1]}`)
        return Util.checkAnswer(solution[1], 335330)
        
    }

    partTwo() {
        this.prepareDataForPuzzle();

        let solution = this.getCheapestAlignment(false)
        console.log(`Align Crabs @ position ${solution[0]}, costs ${solution[1]}`)
        return Util.checkAnswer(solution[1], 92439766)
    }

    prepareDataForPuzzle() {
        if (this.crabPositions.length === 0) {
            this.crabPositions = this.dataReader.convertFileToArrayOfNumbers("inputFiles/daySevenInput.txt", ",");
        }
    }

}