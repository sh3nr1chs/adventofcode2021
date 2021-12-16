import { SpecializedDataReader } from "../../shared/SpecializedDataReader.js";
import { Util } from "../../shared/util.js";

export class CavernMapCreator extends SpecializedDataReader {
    readCavernMap(fileName: string){
        let cavernMapRows: any[] = []
        let rows =this.dataReader.convertFileToStringArray(fileName);
        rows.forEach(row => {
            let stringArray = row.toString().split('')
            cavernMapRows.push(Util.convertStringArrayToNumberArray(stringArray))
        })

        return cavernMapRows;
    }

    

    createLargerCavernMap(originalMap: any[], timesToRepeatOriginalMap:number): any[]{
        let largerMap: any[] = this.extendColumns(originalMap, timesToRepeatOriginalMap);
        let additionalRows = this.getAdditionalRows(largerMap, timesToRepeatOriginalMap);

        return largerMap.concat(additionalRows);
    }

    private extendColumns(originalMap: any[], timesToRepeatOriginalMap:number) {
        let extendedMap : any[] = [];
        originalMap.forEach((row:number[]) => {
            let tileIndex = 0;
            let newRow: number[] = [];
            while (tileIndex < timesToRepeatOriginalMap){
                row.forEach((value:number) => {
                    let newValue = value+tileIndex>9?value+tileIndex-9:value+tileIndex;
                    newRow.push(newValue);
                });
                tileIndex++;
            }
            extendedMap.push(newRow);
        })

        return extendedMap;
    }

    private getAdditionalRows(originalMap: any[], timesToRepeatOriginalMap: number) {
        let additionalRows: any[] = [];
        let tileIndex = 1;
        while (tileIndex < timesToRepeatOriginalMap){
            originalMap.forEach(row => {
                let newRow: number[] = [];
                row.forEach((value:number) => {
                    let newValue = value+tileIndex>9?value+tileIndex-9:value+tileIndex;
                    newRow.push(newValue);
                });
                additionalRows.push(newRow);
            })
            tileIndex++;
        }
        return additionalRows;
    }
}