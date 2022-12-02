export class BingoCard {
    bingoCardRows: any[] = [];
    id: number;

    bingoCall: number = -1;

    constructor(data: any[], id:number){
        this.id = id;

        data.forEach(row => {
            let bingoCardRow: BingoCardValue[] = [];
            row.forEach((value: number) => {
                let bingoCardValue = new BingoCardValue(value);
                bingoCardRow.push(bingoCardValue);
            })
            this.bingoCardRows.push(bingoCardRow);
        })
    }

    markNumber(calledNumber: number): number[]{
        let location: number[] = [];
        this.bingoCardRows.forEach((row, rowIndex) => {
            row.forEach((value: BingoCardValue, colIndex:number) => {
                if (value.value === calledNumber) {
                    value.isMarked = true;
                    location = [rowIndex, colIndex];
                }
            })
        })

        return location;
    }

    resetMarks() {
        this.bingoCall = -1;
        this.bingoCardRows.forEach(row => {
            row.forEach((value: BingoCardValue) => {
                value.isMarked = false;
            })
        })
    }


    checkForBingo(location: number[]): boolean{
        let hasBingo: boolean = false;

        //bingoByRows
        hasBingo = this.checkForBingoByRow(location[0]);
        if (!hasBingo) {
            hasBingo = this.checkForBingoByCol(location[1]);
        }
    
        return hasBingo;
    }

    private checkForBingoByRow(rowIndex:number) {
        let hasBingo = false;

        let rowToCheck = this.bingoCardRows[rowIndex];
        let numMarkedInRow = 0;
        rowToCheck.forEach((value: BingoCardValue) => {
            if (value.isMarked) {
                numMarkedInRow ++;
            }
        })

        if (numMarkedInRow ===rowToCheck.length) {
            hasBingo = true;
        }      

        return hasBingo;
    }

    private checkForBingoByCol(colIndex:number) {
        let hasBingo = false;
                
        let numMarkedInCol = 0;
        this.bingoCardRows.forEach(row=>{
            if(row[colIndex].isMarked) {
                numMarkedInCol ++;
            }    
        })
        if (numMarkedInCol === this.bingoCardRows[0].length) {
            hasBingo = true;
        }
        
        return hasBingo;
    }

    calculateScore() {
        let score = 0;
        this.bingoCardRows.forEach(row => {
            row.forEach((value: BingoCardValue) => {
                if (!value.isMarked) {
                    score += value.value;
                }
            })
        })
        return score;
    }

    printCard() {
        console.log(`CARD ${this.id} START`);
        this.bingoCardRows.forEach(row => {
            let rowString = '';
            row.forEach((value: BingoCardValue) => {
                let valueToPrint = value.value.toString();
                if (value.isMarked) {
                    valueToPrint = `[${value.value}]`;
                }
                rowString = rowString + ' ' + valueToPrint;
            })
            console.log(rowString);
        })
        console.log(`CARD ${this.id} END`);
    }
}

export class BingoCardValue {
    value: number;
    isMarked: boolean = false;
    constructor(value:number) {
        this.value = value;
    }
}
