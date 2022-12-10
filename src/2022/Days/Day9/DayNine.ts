import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";
import { Util } from "../../../shared/util.js";
import { Rope } from "./Rope.js";
import { RopeLocation } from "./RopeLocation.js";

export class DayNine extends Day implements DayInterface {
    dayName: string = '2022 Day Nine';

    locations:Array<RopeLocation[]> = [[new RopeLocation()]];
    head = new Rope('head');
    tail = new Rope('tail');
    movements: string[] = [];

    partOne() {
        this.prepareDataForPuzzle();

        let knots = [this.tail];

        let numberUniqueTailVisits = 1;
        this.movements.forEach(move => {
            let dir = move.split(" ")[0];
            let num = parseInt(move.split(" ")[1]);

            for(let moveInd=0; moveInd < num; moveInd++){
                this.moveHead(dir, knots);
                if(!this.knotIsOneAway(this.tail, this.head)){
                    this.moveKnot(this.tail, this.head);
                    if (!this.locations[this.tail.rowIndex][this.tail.colIndex].tailHasVisited){
                        numberUniqueTailVisits++;
                        this.locations[this.tail.rowIndex][this.tail.colIndex].tailHasVisited = true;
                    }
                }

            }
        })
       
        console.log(`The tail has visited ${numberUniqueTailVisits} unique locations.`)
        return Util.checkAnswer(numberUniqueTailVisits, 6081);
    }

    partTwo() {
        this.prepareDataForPuzzle();

        let knots = [new Rope('1'), new Rope('2'), new Rope('3'),new Rope('4'),new Rope('5'),new Rope('6'),new Rope('7'),new Rope('8'), this.tail]

        let numberUniqueTailVisits = 1;
        this.movements.forEach(move => {
            let dir = move.split(" ")[0];
            let num = parseInt(move.split(" ")[1]);

            for(let moveInd=0; moveInd < num; moveInd++){
                this.moveHead(dir, knots);
                knots.forEach((knot, index) => {
                    let prevKnot = knots[index-1]?knots[index-1]:this.head;
                    if(!this.knotIsOneAway(knot, prevKnot)){
                        this.moveKnot(knot, prevKnot);
                        if(index === knots.length-1 && !this.locations[this.tail.rowIndex][this.tail.colIndex].tailHasVisited) {
                            numberUniqueTailVisits++;
                            this.locations[this.tail.rowIndex][this.tail.colIndex].tailHasVisited = true;
                        }
                    }
                })
            }
        })
       
        console.log(`The tail has visited ${numberUniqueTailVisits} unique locations.`)
        return Util.checkAnswer(numberUniqueTailVisits, 2487);
    }

    moveHead(dir:string, knots: Rope[]){
        if(dir === 'R') {
            //does this location exist
            if(this.locations[this.head.rowIndex][this.head.colIndex+1] === undefined) {
                this.locations.forEach(row => row.push(new RopeLocation()));
            }
            this.head.colIndex++;
        } else if (dir === 'L'){
            if(this.head.colIndex === 0){
                this.locations.forEach(row => row.unshift(new RopeLocation()));
                //colIndex for head stays the same, but the knots must be adjusted
                knots.forEach(knot => knot.colIndex++)
            } else {
                //we can assume it exists and we can move left
                this.head.colIndex--;
            }
        } else if (dir === 'U') {
            //does this row exist?
            if(this.locations[this.head.rowIndex+1] === undefined) {
                let newRow: RopeLocation[] = [];
                for(let i = 0; i < this.locations[this.head.rowIndex].length; i++){
                    newRow.push(new RopeLocation());
                }
                this.locations.push(newRow);
            }
            this.head.rowIndex++;
        } else {
            //DOWN
            if(this.head.rowIndex === 0){
                let newRow: RopeLocation[] = [];
                for(let i = 0; i < this.locations[this.head.rowIndex].length; i++){
                    newRow.push(new RopeLocation());
                }
                this.locations.unshift(newRow);
                //rowIndex for head stays the same (0), but the knots must be adjusted
                knots.forEach(knot => knot.rowIndex++)
            } else {
                this.head.rowIndex --;
            }
        }
    }

    knotIsOneAway(knot: Rope, prevKnot: Rope){
        return (knot.rowIndex <= prevKnot.rowIndex + 1 && knot.rowIndex >= prevKnot.rowIndex - 1) 
        && (knot.colIndex <= prevKnot.colIndex + 1 && knot.colIndex >= prevKnot.colIndex - 1)
    }

    moveKnot(knot: Rope, prevKnot: Rope){
        //up or down or left or right
        if(prevKnot.colIndex > knot.colIndex && prevKnot.rowIndex === knot.rowIndex){
            //same row, head is right
            knot.colIndex ++;
        } else if (prevKnot.colIndex < knot.colIndex && prevKnot.rowIndex === knot.rowIndex){
            //same row, head is left
            knot.colIndex --;
        }else if (prevKnot.rowIndex < knot.rowIndex && prevKnot.colIndex === knot.colIndex){
            //same column, head is down
            knot.rowIndex --;
        } else if (prevKnot.rowIndex > knot.rowIndex && prevKnot.colIndex === knot.colIndex){
            //same column, head is up
            knot.rowIndex ++;
        }
        //diags
        else if (prevKnot.rowIndex > knot.rowIndex && prevKnot.colIndex > knot.colIndex){
            //diagonal U & R
            knot.colIndex++;
            knot.rowIndex++;
        } else if (prevKnot.rowIndex < knot.rowIndex && prevKnot.colIndex < knot.colIndex){
            //diagonal D & L
            knot.colIndex--;
            knot.rowIndex--;
        } else if (prevKnot.rowIndex < knot.rowIndex && prevKnot.colIndex > knot.colIndex){
            //diagonal D & R
            knot.colIndex++;
            knot.rowIndex--;
        } else if (prevKnot.rowIndex > knot.rowIndex && prevKnot.colIndex < knot.colIndex){
            //diagonal U & L
            knot.colIndex--;
            knot.rowIndex++;
        }
    }

    prepareDataForPuzzle() {
        this.movements = this.dataReader.convertFileToStringArray("src/2022/inputFiles/DayNineInput.txt")
        this.locations = [[new RopeLocation()]];
        this.locations[0][0].tailHasVisited = true;
        this.head = new Rope('head');
        this.tail = new Rope('tail');

    }
    
}