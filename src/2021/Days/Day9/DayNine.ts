import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface";
import { HeightMap } from "./HeightMap.js";
import { HeightMapReader } from "./HeightMapReader.js";

export class DayNine extends Day implements DayInterface {
    dayName: string = "Day Nine";
    heightMapReader: HeightMapReader = new HeightMapReader(this.dataReader);

    heightMap: HeightMap = new HeightMap([]);

    partOne(): boolean {
        this.prepareDataForPuzzle();

        let totalForRiskLevel = 0;
        let lowPointsRiskLevels: number[] = this.heightMap.getLowPointRiskLevels();
        lowPointsRiskLevels.forEach(riskLevel => totalForRiskLevel += riskLevel)
        
        console.log(`Total Risk Level for all Low Points: ${totalForRiskLevel}`)
        return Util.checkAnswer(totalForRiskLevel, 425);
    }
    partTwo(): boolean {
        this.prepareDataForPuzzle();

        let basinSizes = this.heightMap.getBasinSizes();
        basinSizes.sort((a, b) => b-a);

        let solution = basinSizes[0] * basinSizes[1] * basinSizes[2];
        console.log(`Sizes of top three largest basins multiplied: ${solution}`)
        return Util.checkAnswer(solution, 1135260);
    }

    prepareDataForPuzzle() {
        if(this.heightMap.heightMap.length === 0){
            this.heightMap = this.heightMapReader.readHeightMap("src/2021/inputFiles/dayNineInput.txt")
        }
    }

}