export class Paper{
    paperRows: any[];
    
    constructor() {
        this.paperRows = [];
    }

    countMarks(){
        let count = 0;
        this.paperRows.forEach(row => {
            row.forEach((place: string) =>
            {
                if (place === '#'){
                    count++;
                }
            })
        })

        return count;
    }

    markPaper(markIndexes: any[]) {
        this.createPaper(markIndexes);
        this.printPaper();
        markIndexes.forEach(markIndex => {
            this.markIndex(markIndex);
        })
        
    }

    private createPaper(markIndexes: any[]) {
        this.paperRows = [];

        let maxColIndex = 0;
        let maxRowIndex = 0;

        markIndexes.forEach(index => {
            if (index[0] > maxColIndex) {
                maxColIndex = index[0]
            }
            if(index[1] > maxRowIndex) {
                maxRowIndex = index[1]
            }
        })

        let rowIndex = 0;
        while (rowIndex < maxRowIndex+1){
            this.paperRows.push(this.createEmptyRow(maxColIndex+1));
            rowIndex ++;
        }

        console.log(`The Paper has ${this.paperRows[0].length} cols and ${this.paperRows.length} rows.`)
    }

    foldPaper(folds: string[]) {
        folds.forEach(fold => {
            let foldSplit = fold.split('=');
            let foldValue = parseInt(foldSplit[1]);
            //if y, the COL stays the same, but the ROW changes
            if (foldSplit[0] === 'y') {
                this.foldForY(foldValue);
            } else {
                this.foldForX(foldValue);
            }
            
        })
    }

    private foldForX(foldValue: number) {
        let colsAfterFold: any[] = this.getColsAfterFold(foldValue);
        // console.log(colsAfterFold)
        this.removeColsFromPaper(foldValue);
        colsAfterFold.forEach((row: string[], rowIndex: number) => {
            row.forEach((place, colIndex) => {
                if(place === '#') {
                    this.markIndex([row.length - colIndex-1 , rowIndex])
                }
            })
        })
        
    }

    private getColsAfterFold(foldValue:number){
        let afterFold: any[] = [];
        this.paperRows.forEach(row => {
            afterFold.push(row.filter((place:string, index:number) => index > foldValue))
        })

        return afterFold
    }

    private removeColsFromPaper(foldValue:number) {
        this.paperRows.forEach(row => {
            while (row.length !== foldValue) {
                row.pop();
            }
        })

        this.printPaper();
        console.log(`new number of cols: ${this.paperRows[0].length}`)
    }

    private foldForY(foldValue: number) {
        let rowsBelowFold = this.paperRows.filter((row, index: number) => index > foldValue)
        // console.log(rowsBelowFold)
        this.removeRowsFromPaper(foldValue, rowsBelowFold.length);
        rowsBelowFold.forEach((rowBelowFold, rowIndex:number) => {
            rowBelowFold.forEach((markInRow: string, colIndex: number) => {
                if(markInRow === '#') {
                    this.markIndex([colIndex, this.paperRows.length-1 - rowIndex])
                }
            });
        })
    }

    private removeRowsFromPaper(foldValue:number, numRowsBelowFold: number) {
        while (this.paperRows.length !== foldValue) {
            this.paperRows.pop();
        }

        this.printPaper();
        console.log(`new number of rows: ${this.paperRows.length}`)
    }

    private markIndex(markIndex: number[], marker='#') {
        this.paperRows[markIndex[1]][markIndex[0]] = marker;
    }

    private createEmptyRow(rowLength: number){
        let row = [];
        while(row.length < rowLength){
            row.push('.');
        }
        return row;
    }

    printPaper() {
        console.log(`START PAPER`);
        this.paperRows.forEach(row => {
            let rowString = '';
            row.forEach((value: string) => {
                rowString = rowString + ' ' + value;
            })
            console.log(rowString);
        })
        console.log(`END PAPER`);
    }
}