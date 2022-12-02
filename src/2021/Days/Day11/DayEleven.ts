import { TwoDArrayService } from "../../../shared/2DArrayService.js";
import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface";

export class DayEleven extends Day implements DayInterface {
    dayName: string = "Day Eleven";

    twoDArrayService: TwoDArrayService = new TwoDArrayService([]);

    dumboOctopuses : any[] = []

    partOne(): boolean {
        this.prepareDataForPuzzle();
        let numFlash = this.getNumberOfFlashesAfterXDays(100);
        console.log(`number of flashes after 100 days: ${numFlash}`)
        return Util.checkAnswer(numFlash, 1741);
    }

    private getNumberOfFlashesAfterXDays(numDays: number):number {
        let numFlash = 0
        let dayIndex = 0
         while(dayIndex < numDays) {
            let flashingList = this.performFlash();
             numFlash += flashingList.length
             dayIndex++;
         }
         return numFlash
     }

    partTwo(): boolean {
        this.prepareDataForPuzzle();
        let numOctopuses = this.getNumberOfOctopuses();
        let dayWhereAllOctopusesFlash = this.getDayAllOctopusesFlash(numOctopuses);
        console.log(`All ${numOctopuses} octopuses flash on day ${dayWhereAllOctopusesFlash}`)
        return Util.checkAnswer(dayWhereAllOctopusesFlash, 440);
    }

    private getNumberOfOctopuses() {
        let numRows = this.dumboOctopuses.length;
        let numCols = this.dumboOctopuses[0].length;
        return numRows * numCols;
    }

    private getDayAllOctopusesFlash(numOctopuses: number) {
        let numFlashOnDay = 0;
        let dayIndex = 0;
        while (numFlashOnDay !== numOctopuses){
            let flashingList = this.performFlash();
            numFlashOnDay = flashingList.length;
            dayIndex ++
        }
        return dayIndex;
    }

    private performFlash(){
        let flashingList: any[] = [];
        this.dumboOctopuses.forEach((row, rowIndex) => {
            row.forEach((octopus: number, colIndex:number) => {
                if (!Util.indexIsAlreadyInList(flashingList, [rowIndex, colIndex])){
                    row[colIndex] = octopus += 1;
                    flashingList = this.getFlashingOctopuses([rowIndex, colIndex], flashingList)
                }
            })
        })

        return flashingList;
    }

    private getFlashingOctopuses(index: number[], flashIndexes:any[]=[]){
        let octopusEnergyLevel = this.twoDArrayService.getValueAtIndex(index)
        
        if (octopusEnergyLevel > 9 && !Util.indexIsAlreadyInList(flashIndexes, index)) {
            this.dumboOctopuses[index[0]][index[1]] = 0
            flashIndexes.push(index)
            this.twoDArrayService.getAdjacentIndices(index, true).forEach(index => {   
                if(this.twoDArrayService.isValidColIndex(index[1]) && this.twoDArrayService.isValidRowIndex(index[0]) && !Util.indexIsAlreadyInList(flashIndexes, index)){
                this.dumboOctopuses[index[0]][index[1]] ++;
                this.getFlashingOctopuses(index, flashIndexes)}
            })
        }

        return flashIndexes;
    }

    private printOctopuses(){
        this.dumboOctopuses.forEach(row => console.log(row.toString()))
    }

    prepareDataForPuzzle() {
        this.dumboOctopuses = this.dataReader.convertFileToArrayOfNumberArrays("src/2021/inputFiles/dayElevenInput.txt")
        this.twoDArrayService = new TwoDArrayService(this.dumboOctopuses);
    }

}