import { Util } from "../../shared/util.js";
import { Day } from "../Day.js";
import { DayInterface } from "../DayInterface.js";

export class DayEleven extends Day implements DayInterface {
    dayName: string = "Day Eleven";

    dumboOctopuses : any[] = []

    partOne(): boolean {
        this.prepareDataForPuzzle();
        let numFlash = this.getNumberOfFlashesAfterXDays(100);
        console.log(`number of flashes after 100 days: ${numFlash}`)
        return Util.checkAnswer(numFlash, 1741);
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
        let numFLashOnDay = 0;
        let dayIndex = 0;
        while (numFLashOnDay !== numOctopuses){
            let flashingList = this.performFlash();
            numFLashOnDay = flashingList.length;
            dayIndex ++
        }

        return dayIndex;
    }

    private performFlash(){
        let flashingList: any[] = [];
        this.dumboOctopuses.forEach((row, rowIndex) => {
            row.forEach((octopus: number, colIndex:number) => {
                if (!this.indexIsAlreadyInList(flashingList, [rowIndex, colIndex])){
                    row[colIndex] = octopus += 1;
                    flashingList = this.getFlashingOctopuses([rowIndex, colIndex], flashingList)
                }
            })
                
          
            
        })

        return flashingList;
    }
    private getNumberOfFlashesAfterXDays(numDays: number):number {
       let numFlash = 0
       let dayIndex = 0
        while(dayIndex < numDays) {
           let flashingList = this.performFlash();
            //increment naturally
            

            numFlash += flashingList.length
            this.printOctopuses()
            console.log(`num flash: ${numFlash}`);

            //flash!
            // let flashingOctopuses = this.getFlashingOctopuses([0,0])
            // console.log(flashingOctopuses.length)

            
            dayIndex++;
        }
        return numFlash
    }

    private getFlashingOctopuses(index: number[], flashIndexes:any[]=[]){
        let octopusEnergyLevel = this.getOctopusAtIndex(index)
        
        if (octopusEnergyLevel > 9 && !this.indexIsAlreadyInList(flashIndexes, index)) {
            // console.log(`FLASH @ ${index}`)
            this.dumboOctopuses[index[0]][index[1]] = 0
            flashIndexes.push(index)
            this.getAdjacentIndices(index).forEach(index => {   
                if(this.isValidColIndex(index[1]) && this.isValidRowIndex(index[0]) && !this.indexIsAlreadyInList(flashIndexes, index)){
                this.dumboOctopuses[index[0]][index[1]] ++;
                this.getFlashingOctopuses(index, flashIndexes)}
            })
        }

        return flashIndexes;
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

    private getOctopusAtIndex(index: number[]){
        let reading = undefined;
        if(this.isValidRowIndex(index[0]) && this.isValidColIndex(index[1])) {
            reading = this.dumboOctopuses[index[0]][index[1]]
        }
        return reading;
    }

    private getAdjacentIndices(index:number[]) {
        let rowIndex = index[0];
        let colIndex = index[1];
        return [[rowIndex-1, colIndex], [rowIndex, colIndex-1], [rowIndex, colIndex+1], [rowIndex+1, colIndex],
                [rowIndex-1, colIndex-1], [rowIndex-1, colIndex+1], [rowIndex+1, colIndex-1], [rowIndex+1,colIndex+1]];
    }

    private isValidRowIndex(rowIndex:number) {
        return rowIndex > -1 && rowIndex < this.dumboOctopuses.length
    }

    private isValidColIndex(colIndex:number) {
        return colIndex > -1 && colIndex < this.dumboOctopuses[0].length
    }

    private printOctopuses(){
        this.dumboOctopuses.forEach(row => console.log(row.toString()))
    }
    prepareDataForPuzzle() {
        this.dumboOctopuses = this.dataReader.convertFileToArrayOfNumberArrays("inputFiles/dayElevenInput.txt")
    }

}