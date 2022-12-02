import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface";
import { ChunkType } from "./ChunkType.js";

export class DayTen extends Day implements DayInterface {
    dayName: string = "Day Ten"

    chunkTypes: ChunkType[] = []
    input: string[] = [];

    private processLine(line: string) {
        let firstCorruptedChar: ChunkType | undefined;
        let openChunks: ChunkType[] = [];
        
        let charIndex = 0;
        while(charIndex < line.length && firstCorruptedChar === undefined) {
            let character = line[charIndex]
            let chunkTypeForChar = this.getChunkType(character);
                
            if(this.charOpensChunk(character)) {
                openChunks.push(chunkTypeForChar)
            }

            if(this.charClosesChunk(character)) {
                let currentOpenChunk = openChunks.pop();
                let openChunk: ChunkType = currentOpenChunk === undefined? new ChunkType(':', ':', 0, 0):currentOpenChunk;
                
                if(!openChunk.isClosedBy(character)){
                    firstCorruptedChar = this.getChunkType(character)
                    openChunks = []
                }
            }
            charIndex++
        };

        let chunksNeededToClose = openChunks.reverse();
        return [firstCorruptedChar, chunksNeededToClose];
    }

    partOne(): boolean {
        this.prepareDataForPuzzle();

        let processingResults: any[] = this.processInput();
        let syntaxErrorScore = processingResults[0]

        console.log(`Syntax Error Score: ${syntaxErrorScore}`)
        return Util.checkAnswer(syntaxErrorScore, 392043);
    }

    partTwo() {
        this.prepareDataForPuzzle();

        let processingResults: any[] = this.processInput();
        let completionScores: number[] = processingResults[1]

        completionScores.sort((a,b) => a-b);
        let middleIndex = Math.round(completionScores.length/2)-1;
        let middleCompletionScore = completionScores[middleIndex];

        console.log(`Middle Completion Score: ${middleCompletionScore}`)
        return Util.checkAnswer(middleCompletionScore, 1605968119);
    }

    private processInput() {
        let syntaxErrorScore = 0;
        let completionScores: number[] = [];

        this.input.forEach(line => {
            let lineResult: any[] = this.processLine(line)
            let corruptedChunkType = lineResult[0]
            let completionChunks = lineResult[1]
        
            //check for corrupted lines
            if (corruptedChunkType !== undefined){
                syntaxErrorScore += this.calculateErrorScore(corruptedChunkType);
            } else if (completionChunks.length > 0){
                completionScores.push(this.calculateCompletionScore(completionChunks))
            }
        })

        return [syntaxErrorScore, completionScores]
    }

    private getChunkType(character:string): ChunkType {
        return this.chunkTypes.filter(chunkType => chunkType.openingChar === character || chunkType.closingChar === character)[0];
    }

    private charOpensChunk(character:string){
        return character === '(' || character === '[' || character === '{'  || character === '<' 
    }

    private charClosesChunk(character:string){
        return character === ')' || character === ']' || character === '}'  || character === '>' 
    }

    private calculateErrorScore(corruptedChar: ChunkType){
        return corruptedChar.errorScore
    }

    private calculateCompletionScore(completionChunks:ChunkType[]){
        let score = 0;
        completionChunks.forEach(chunk =>{
            score = score*5;
            score += chunk.completionScore
        })

        return score
    }
        
    prepareDataForPuzzle() {
        if (this.input.length === 0) {
            this.input = this.dataReader.convertFileToStringArray("src/2021/inputFiles/dayTenInput.txt")
        }
        this.chunkTypes = [new ChunkType('(', ')', 3, 1),
                           new ChunkType('[', ']', 57, 2),
                           new ChunkType('{', '}', 1197, 3),
                           new ChunkType('<', '>', 25137, 4)]
    }

}