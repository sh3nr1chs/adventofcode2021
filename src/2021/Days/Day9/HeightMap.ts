import { TwoDArrayService } from "../../../shared/2DArrayService.js";
import { Util } from "../../../shared/util.js";

export class HeightMap {
    twoDArrayService: TwoDArrayService;
    heightMap: any[] = [];

    constructor(heightMapRows: any[]){
        this.heightMap = heightMapRows;
        this.twoDArrayService = new TwoDArrayService(this.heightMap);
    }

    getLowPointRiskLevels(): number[] {
        let riskLevels : number[] = [];
        let lowPointIndexes = this.getLowPointIndexes();
        lowPointIndexes.forEach((lowPointIndex: number[]) => {
            let lowPointHeight = this.twoDArrayService.getValueAtIndex(lowPointIndex)
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

    private getBasinIndices(index: number[], basinIndices:any[] = []): any[] {
        let valueAtIndex = this.twoDArrayService.getValueAtIndex(index);
        let height = 0;

        if (valueAtIndex === undefined) {
            height = 9;
        } else {
            height = valueAtIndex
        }

        if (height !== 9 && !Util.indexIsAlreadyInList(basinIndices, index)) {
            basinIndices.push(index)
            this.twoDArrayService.getAdjacentIndices(index, false).forEach(index => this.getBasinIndices(index, basinIndices))
        }

        return basinIndices;
    }

    private getAdjacentValues(index:number[]): number[] {
        let adjacentReadings: number[] = [];
        let checkIndexes = this.twoDArrayService.getAdjacentIndices(index, false)
        checkIndexes.forEach(checkIndex=>{
            adjacentReadings.push(this.twoDArrayService.getValueAtIndex(checkIndex));
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
}