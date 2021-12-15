import { Util } from "../../shared/util.js";
import { Day } from "../Day.js";
import { DayInterface } from "../DayInterface.js";
import { PolymerInputReader } from "./PolymerInputReader.js";

export class DayFourteen extends Day implements DayInterface {
    dayName: string = "Day Fourteen";

    polymerInputReader = new PolymerInputReader(this.dataReader);

    originalTemplate: string = '';
    polymerPairs: Map<string, number> = new Map();
    insertionInstructions: Map<string, string> = new Map();

    partOne(): boolean {
        this.prepareDataForPuzzle();
        let solution = this.getSolutionAfterXSteps(10)

        return Util.checkAnswer(solution, 3118);
    }

    partTwo(): boolean {
        this.prepareDataForPuzzle();
        let solution = this.getSolutionAfterXSteps(40)

        return Util.checkAnswer(solution, 4332887448171);
    }

    private getSolutionAfterXSteps(numSteps: number) {
        this.stepXTimes(numSteps);
        let count : Map<string, number> = this.countCharacters(this.originalTemplate);
        let mostCommonAndLeastCommon: any[] = this.getMostCommonAndLeastCommonLetter(count);
        
        let solution = mostCommonAndLeastCommon[0][1] - mostCommonAndLeastCommon[1][1]
        console.log(`The most common letter after 10 steps is ${mostCommonAndLeastCommon[0][0]}, occuring ${mostCommonAndLeastCommon[0][1]}.`)
        console.log(`The most least letter after 10 steps is ${mostCommonAndLeastCommon[1][0]}, occuring ${mostCommonAndLeastCommon[1][1]}.`)
        console.log(`The occurence of the least subtracted from the occurence of the most is ${solution}.`)

        return solution;
    }

    private getMostCommonAndLeastCommonLetter(count: Map<string, number>){
        let mostCommon = ['', 0];
        let leastCommon = ['', Number.MAX_SAFE_INTEGER]

        count.forEach((countForLetter, letter) => {
            if(countForLetter > mostCommon[1]){
                mostCommon[0] = letter;
                mostCommon[1] = countForLetter;
            }
            if (countForLetter < leastCommon[1]){
                leastCommon[0] = letter;
                leastCommon[1] = countForLetter;
            }
        })

        return [mostCommon, leastCommon]
    }

    private addToCurrentMapValue(map: Map<string, number>, keyToUpdate: string, valueToAdd: number){
        let valueForKey = map.get(keyToUpdate);
        let curNumForKey: number = valueForKey !== undefined?valueForKey:0;
        map.set(keyToUpdate, curNumForKey+valueToAdd);
    }

    private countCharacters(originalTemplate:string){
        let count : Map<string, number>= new Map();

        //add one immediately for the original beginning & end characters, those never change
        count.set(originalTemplate[0], 1);
        count.set(originalTemplate[originalTemplate.length-1], 1)

        this.polymerPairs.forEach((numForPair, pair) => {
            this.addToCurrentMapValue(count, pair[0], numForPair);
            this.addToCurrentMapValue(count, pair[1], numForPair);
        })

        //divide by 2 as each letter is accounted for in two pairs.
        count.forEach((num, letter) => count.set(letter, num/2))
        return count;
    }

    private stepXTimes(numSteps:number){
        let stepIndex = 0;
        while (stepIndex < numSteps){

            let polymerPairsCopy = new Map(this.polymerPairs);
            polymerPairsCopy.forEach((numForPair, pair) => {
              
                let charToInsert = this.insertionInstructions.get(pair);
                if(charToInsert){
                    //add the two newly created pairs
                    this.addToCurrentMapValue(this.polymerPairs, pair[0]+charToInsert, numForPair);
                    this.addToCurrentMapValue(this.polymerPairs, charToInsert+pair[1], numForPair);
                    //remove the pair split by the insertion
                    this.addToCurrentMapValue(this.polymerPairs, pair, -numForPair);
                }
            })
            stepIndex++;
        }
    }

    prepareDataForPuzzle() {
        let fileName: string = "inputFiles/dayFourteenInput.txt"
        this.polymerPairs = this.polymerInputReader.readTemplate(fileName)
        this.insertionInstructions = this.polymerInputReader.readInsertionInstructions(fileName)
        this.originalTemplate = this.polymerInputReader.getOriginalTemplate(fileName)
    }

}