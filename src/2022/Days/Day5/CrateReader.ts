import { SpecializedDataReader } from "../../../shared/SpecializedDataReader.js";
import { DataReader } from "../../../shared/dataReader.js";
import { moveMessagePortToContext } from "worker_threads";

export class CrateReader extends SpecializedDataReader {

    moves: Array<Array<number>> = [] ;
    stacks = new Map();

    constructor(dataReader: DataReader){
        super(dataReader);
    }

   readCrateAndInstructions(fileName: string){
    //reset
    this.moves = [];
    this.stacks = new Map();

    let textByLine = this.dataReader.convertFileToStringArray(fileName);
        
    let readMoves = false;
    textByLine.forEach(line => {
        if(line.includes('[')){
            this.readCrateStacks(line)
        } else if (line === ''){
            readMoves = true;
        } else if (readMoves) {
            this.readMoves(line)
        }

    })
   }

   readCrateStacks(line: string){
    let lineLength = line.length;
    let crateStackIndex = 1;
    for (let i = 0; i < lineLength; i=i+4){
        let crate = line.substring(i+1, i+2);
        if (crate != ' ') {
            this.stacks.get(crateStackIndex)?
                this.stacks.get(crateStackIndex).push(crate)
                :this.stacks.set(crateStackIndex, [crate]);
        }
        crateStackIndex ++;
    }
   }

   readMoves(line:string) {
    let lineSplit = line.split(' ');
    this.moves.push([parseInt(lineSplit[1]), parseInt(lineSplit[3]), parseInt(lineSplit[5])])
   }

   getStacks() {
    return this.stacks;
   }

   getMoves() {
    return this.moves;
   }
}