export class TreeAnalyzer{

    treeMap:Array<number[]> = [];

    visibleTrees = 0;

    constructor(mapOfTrees: Array<number[]>){
        this.treeMap = mapOfTrees;
    }

    countVisibleTrees(){
        return this.countEdges() + this.checkInternalTrees(this.countVisible);
    }

    getMaxScenicScore(){
        return this.checkInternalTrees(this.retrieveMaxScenic);
    }

    checkInternalTrees(methodForEachTree: Function){
        let value = 0;
        for(let rowNum = 1; rowNum < this.treeMap.length-1; rowNum++){
            for (let colNum = 1; colNum < this.treeMap[rowNum].length-1; colNum++){
                let treeHeight = this.treeMap[rowNum][colNum];
                if(methodForEachTree.name.includes('Visible')){
                    value += methodForEachTree(treeHeight, rowNum, colNum, this);
                } else {
                    let currentScore = methodForEachTree(treeHeight, rowNum, colNum, this);
                    if (currentScore > value){
                        value = currentScore;
                    }
                }
            }
        }

        return value;
    }

    retrieveMaxScenic(treeHeight:number, rowIndex:number, colIndex:number, that: TreeAnalyzer){
        return that.getScenicScoreUp(treeHeight, rowIndex, colIndex) * that.getScenicScoreDown(treeHeight, rowIndex, colIndex) * that.getScenicScoreLeft(treeHeight, rowIndex, colIndex) * that.getScenicScoreRight(treeHeight, rowIndex, colIndex)
    }

    countVisible( currentTreeHeight:number, rowIndex:number, colIndex:number, that: TreeAnalyzer){
        if(that.isTreeVisibileByRow(currentTreeHeight, rowIndex, colIndex) || that.isTreeVisibileByCol(currentTreeHeight, rowIndex, colIndex)){
            return 1;
        }
        return 0;
    }

    countEdges(){
        return this.treeMap[0].length*2 + (this.treeMap.length-2)*2;
    }

    getScenicScoreUp(height: number, currentRow: number, currentCol: number){
        let score = 0;
        let keepScoring = true;

        for(let rowIndex = currentRow-1; rowIndex >= 0 && keepScoring; rowIndex--){
            score++;

            let treeHeightForCompare = this.treeMap[rowIndex][currentCol];
            keepScoring = treeHeightForCompare < height;
        }

        return score;
    }

    getScenicScoreDown(height: number, row: number, col: number){
        let score = 0;
        let keepScoring = true;

        for(let rowIndex = row+1; rowIndex < this.treeMap.length && keepScoring; rowIndex++){
            score++
            
            let treeHeightForCompare = this.treeMap[rowIndex][col];
            keepScoring = treeHeightForCompare < height;
        }

        return score;
    }

    getScenicScoreLeft(height: number, row: number, col: number){
        let score = 0;
        let keepScoring = true
        let treeRow = this.treeMap[row];
        for(let colIndex = col-1; colIndex >= 0 && keepScoring; colIndex--){
            score++
           
            let treeHeightForCompare = treeRow[colIndex];
            keepScoring = treeHeightForCompare < height;
        }
        
        return score;
    }

    getScenicScoreRight(height: number, row: number, col: number){
        let score = 0;
        let keepScoring = true
        let treeRow = this.treeMap[row];

        for(let colIndex = col+1; colIndex < treeRow.length && keepScoring; colIndex++){
            score++

            let treeHeightForCompare = treeRow[colIndex];
            keepScoring = treeHeightForCompare < height;
        }

        return score;
    }

    isTreeVisibileByRow(height: number, row: number, col: number){
        return this.isTreeVisibleByRowLeft(height, row, col) || this.isTreeVisibleByRowRight(height, row, col);
    }

    isTreeVisibleByRowLeft(height: number, row: number, col: number){
        let treeRow = this.treeMap[row];
        for(let colIndex = 0; colIndex < col; colIndex++){
            if (treeRow[colIndex] >= height){
                return false;
            }
        }
        return true;
    }

    isTreeVisibleByRowRight(height: number, row: number, col: number){
        let treeRow = this.treeMap[row];
        for(let colIndex = col+1; colIndex < treeRow.length; colIndex++){
            if (treeRow[colIndex] >= height){
                return false;
            }
        }

        return true;
    }

    isTreeVisibileByCol(height: number, row: number, col: number){
        return this.isTreeVisibileByColUp(height, row, col) || this.isTreeVisibileByColDown(height, row, col)
    }

    isTreeVisibileByColUp(height: number, row: number, col: number){
        for(let rowIndex = 0; rowIndex < row; rowIndex++){
            if (this.treeMap[rowIndex][col] >= height){
                return false;
            }
        }

        return true;
    }

    isTreeVisibileByColDown(height: number, row: number, col: number){
        for(let rowIndex = row+1; rowIndex < this.treeMap.length; rowIndex++){
            if (this.treeMap[rowIndex][col] >= height){
                return false;
            }
        }

        return true;
    }

}