import { SpecializedDataReader } from "../../shared/SpecializedDataReader.js";

export class PolymerInputReader extends SpecializedDataReader {
    readTemplate(fileName:string){
        let polymerPairs : Map<string, number>= new Map();
        let templateString = this.dataReader.convertFileToStringArray(fileName)[0];
        let letterArray = templateString.split('');
        letterArray.forEach((letter, index) => {
            if(letterArray[index+1]){
                let pair = letter+letterArray[index+1]
                let valueForPair = polymerPairs.get(pair);
                let curNumForPair: number = valueForPair !== undefined?valueForPair:0;
                polymerPairs.set(pair, curNumForPair+1);
            }
        })

        return polymerPairs;
    }

    getOriginalTemplate(fileName: string) {
        return this.dataReader.convertFileToStringArray(fileName)[0];
    }

    readInsertionInstructions(fileName:string){
        let instructions = new Map();
        let insertionInstructions = this.dataReader.convertFileToStringArray(fileName).filter((instruction, index) => index > 1);
        insertionInstructions.forEach(instruction => {
            let splitInstructions = instruction.split(' -> ');
            instructions.set(splitInstructions[0], splitInstructions[1])
        })

        return instructions;
    }
}