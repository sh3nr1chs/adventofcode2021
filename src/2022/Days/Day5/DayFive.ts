import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";
import { Util } from "../../../shared/util.js";
import { CrateReader } from "./CrateReader.js";

export class DayFive extends Day implements DayInterface {
    dayName: string = '2022 Day Five';
    crateReader = new CrateReader(this.dataReader);
    crates: Map<number, any[]> = new Map();
    moves: Array<Array<number>> = [];


    partOne() {
        this.prepareDataForPuzzle();
        this.moveCrates9000();
        
        let topCrates = this.getTopCrates();

        console.log(`The top crates using the CrateMover9000 are ${topCrates}.`);
     
        return Util.checkAnswer(topCrates, 'RTGWZTHLD');
    }

    partTwo() {
        this.prepareDataForPuzzle();
        this.moveCrates9001();
        
        let topCrates = this.getTopCrates();

        console.log(`The top crates using the CrateMover9001 are ${topCrates}.`);
     
        return Util.checkAnswer(topCrates, 'STHGRZZFR');
    }

   
    prepareDataForPuzzle() {
        this.crateReader.readCrateAndInstructions("src/2022/inputFiles/DayFiveInput.txt")
        this.crates = this.crateReader.getStacks();
        this.moves = this.crateReader.getMoves();
    }

    moveCrates9000() {
        this.moves.forEach(move => {
            let numberOfCrates = move[0];
            let keyForStackStart = move[1];
            let keyForStackEnd = move[2];

            for(let i = 0; i < numberOfCrates; i++) {
                let crateToMove = this.crates.get(keyForStackStart)?.shift();
                this.crates.get(keyForStackEnd)?.unshift(crateToMove);
            }
        })
    }

    moveCrates9001() {
        this.moves.forEach(move => {
            let numberOfCrates = move[0];
            let keyForStackStart = move[1];
            let keyForStackEnd = move[2];

            let cratesToMove = [];
            for(let i = 0; i < numberOfCrates; i++) {
                cratesToMove.push(this.crates.get(keyForStackStart)?.shift());
            }

            this.crates.set(keyForStackEnd, cratesToMove.concat(this.crates.get(keyForStackEnd)));
        })
    }

    getTopCrates() {
        let topCrates = '';
        let numStacks = this.crates.size;
        for(let i = 0; i < numStacks; i++) {
            topCrates += this.crates.get(i+1)?.shift();
        }
        return topCrates;
    }

}