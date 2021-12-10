export class HeightMap {
    heightMap: any[] = [];

    constructor(heightMapRows: any[]){
        this.heightMap = heightMapRows;
    }

    getLowPointRiskLevels() {
        let riskLevels : number[] = [];
        let lowPointIndexes = this.getLowPointIndexes();
        lowPointIndexes.forEach((lowPointIndex: number[]) => {
            let lowPointHeight = this.getReadingAtIndex(lowPointIndex)
            riskLevels.push(lowPointHeight+1)
        })
        return riskLevels;
    }

    getBasinSizes(): number[] {
        let basinSizes : number[] = []
        let lowPointIndexes = this.getLowPointIndexes();
        lowPointIndexes.forEach(lowPointIndex=>{
            let basinIndices = this.getBasinIndices(lowPointIndex)
            basinSizes.push(basinIndices.length)
        })

        return basinSizes;
    }

    private getLowPointIndexes(): any[] {
        let lowPoints : any[] = []
        this.heightMap.forEach((row, rowIndex) => {
            row.forEach((height: number, colIndex:number) => {
                let adjacentValues = this.getAdjacentValues([rowIndex, colIndex]);
                if(this.isLowPoint(height, adjacentValues)) {
                    lowPoints.push([rowIndex, colIndex])
                }
            });
        })
        return lowPoints;
    }

    private indexIsAlreadyInList(list: any[], index: number[]) {
        let isInlist = false;
        list.forEach(item => {
            if (item[0] === index[0] && item[1] === index[1]){
                isInlist = true;
            }
        })

        return isInlist;
    }

    private getBasinIndices(index: number[], basinIndices:any[] = []): any[] {
        let height = this.getReadingAtIndex(index);
        if (height !== 9 && !this.indexIsAlreadyInList(basinIndices, index)) {
            basinIndices.push(index)
            this.getAdjacentIndices(index).forEach(index => this.getBasinIndices(index, basinIndices))
        }

        return basinIndices;
    }

    private getAdjacentIndices(index:number[]) {
        let rowIndex = index[0];
        let colIndex = index[1];
        return [[rowIndex-1, colIndex], [rowIndex, colIndex-1], [rowIndex, colIndex+1], [rowIndex+1, colIndex]];
    }

    private getAdjacentValues(index:number[]): number[] {
        let adjacentReadings: number[] = [];
        let checkIndexes = this.getAdjacentIndices(index)
        checkIndexes.forEach(checkIndex=>{
            adjacentReadings.push(this.getReadingAtIndex(checkIndex));
        })
        return adjacentReadings;
    }

    private isLowPoint(height: number, adjacentValues: number[]) {
        let isLowPoint = true;
        let index = 0;
        while (isLowPoint && index < adjacentValues.length) {
            if (height >= adjacentValues[index]){
                isLowPoint = false;
            }
            index++
        }
        return isLowPoint;
    }

    private getReadingAtIndex(index: number[]){
        let reading = 9;
        if(this.isValidRowIndex(index[0]) && this.isValidColIndex(index[1])) {
            reading = this.heightMap[index[0]][index[1]]
        }
        return reading;
    }

    private isValidRowIndex(rowIndex:number) {
        return rowIndex > -1 && rowIndex < this.heightMap.length
    }

    private isValidColIndex(colIndex:number) {
        return colIndex > -1 && colIndex < this.heightMap[0].length
    }
}