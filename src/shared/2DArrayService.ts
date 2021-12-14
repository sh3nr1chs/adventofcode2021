export class TwoDArrayService {
    twoDArray: any[];

    constructor(twoDArray: any[]) {
        this.twoDArray = twoDArray;
    }

    getValueAtIndex(index: number[]){
        let reading = undefined;
        if(this.isValidRowIndex(index[0]) && this.isValidColIndex(index[1])) {
            reading = this.twoDArray[index[0]][index[1]]
        }
        return reading;
    }

    isValidRowIndex(rowIndex:number) {
        return rowIndex > -1 && rowIndex < this.twoDArray.length
    }

    isValidColIndex(colIndex:number) {
        return colIndex > -1 && colIndex < this.twoDArray[0].length
    }

    getAdjacentIndices(index:number[], includeDiagonals: boolean) {
        let rowIndex = index[0];
        let colIndex = index[1];

        let adjacentIndices = [[rowIndex-1, colIndex], [rowIndex, colIndex-1], [rowIndex, colIndex+1], [rowIndex+1, colIndex]];
        if (includeDiagonals) {
            adjacentIndices = adjacentIndices.concat([[rowIndex-1, colIndex-1], [rowIndex-1, colIndex+1], [rowIndex+1, colIndex-1], [rowIndex+1,colIndex+1]]);
        }
        return adjacentIndices;
    }
}