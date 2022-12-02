export class Paper{
    paperRows: any[];
    
    constructor() {
        this.paperRows = [];
    }

    countMarks(){
        let count = 0;
        this.paperRows.forEach(row => {
            count += row.filter((place:string) => place === '#').length
        })
        return count;
    }

    markPaper(markIndexes: any[]) {
        this.createPaper(markIndexes);
        markIndexes.forEach(markIndex => {
            this.markIndex(markIndex);
        })
    }

    private markIndex(index:number[], marker:string = '#'){
        this.paperRows[index[1]][index[0]] = marker;
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
    }

    private createEmptyRow(numCols: number){
        let row = [];
        while(row.length < numCols){
            row.push('.');
        }
        return row;
    }

    foldPaper(folds: string[]) {
        folds.forEach(fold => {
            let foldSplit = fold.split('=');
            let foldValue = parseInt(foldSplit[1]);
            //if y, the COL stays the same, but the ROW changes
            if (foldSplit[0] === 'y') {
                this.foldForY(foldValue);
            } else {
            //if x, the ROW stays the same, but the COL changes
                this.foldForX(foldValue);
            }            
        })
    }

    private foldForY(foldValue:number) {
        let rowsAfterFold = this.retrieveRowsAfterFold(foldValue);
        this.updatePaperToRemoveRows(foldValue);     
        
        //actual folding
        rowsAfterFold.forEach((row: string[], rowIndex) => {
            row.forEach((place: string, colIndex: number) => {
                if (place === '#'){
                    let newRowIndex = foldValue-(rowIndex+1)
                    this.markIndex([colIndex, newRowIndex])
                }
            })
        })
    }

    private retrieveRowsAfterFold(foldValue:number) {
        let rowsAfterFold: any[] = [];
        this.paperRows.forEach((row: string[], rowIndex) => {
            if (rowIndex > foldValue) {
                rowsAfterFold.push(row)
            }
        });

        return rowsAfterFold;
    }

    private updatePaperToRemoveRows(foldValue:number){
        while (this.paperRows.length > foldValue){
            this.paperRows.pop();
        }
    }

    private foldForX(foldValue:number) {
        let colsAfterFold = this.retrieveColsAfterFold(foldValue);
        this.updatePaperToRemoveCols(foldValue);     
        
        //actual folding
        colsAfterFold.forEach((row: string[], rowIndex) => {
            row.forEach((place: string, colIndex: number) => {
                if (place === '#'){
                    let newColIndex = foldValue-(colIndex+1)
                    this.markIndex([newColIndex, rowIndex])
                }
            })
        })
    }

    private retrieveColsAfterFold(foldValue:number) {
        let colsAfterFold: any[] = [];
        this.paperRows.forEach((row: string[]) => {
            let rowString = '';
            row.forEach((place: string, colIndex:number) => {
                if(colIndex > foldValue) {
                    rowString = rowString.concat(place)
                }
            });
            colsAfterFold.push(rowString.split(''));
        });

        return colsAfterFold;
    }

    private updatePaperToRemoveCols(foldValue:number){
        this.paperRows.forEach((row) => {
            row.forEach((place: string) => {
                while (row.length > foldValue){
                    row.pop();
                }
            });
        })
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