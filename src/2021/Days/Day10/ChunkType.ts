export class ChunkType {
    openingChar: string;
    closingChar: string;

    errorScore: number;
    completionScore: number;

    constructor(opener:string, closer:string, errorScore:number, completionScore:number) {
        this.openingChar = opener
        this.closingChar = closer;
        this.errorScore = errorScore;
        this.completionScore = completionScore;
        
    }

    isClosedBy(character: string) {
        return this.closingChar === character
    }
}