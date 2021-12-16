import { SpecializedDataReader } from "../../shared/SpecializedDataReader.js";
import { Util } from "../../shared/util.js";

export class CavernMapReader extends SpecializedDataReader {
    readCavernMap(fileName: string){
        let cavernMapRows: any[] = []
        let rows =this.dataReader.convertFileToStringArray(fileName);
        rows.forEach(row => {
            let stringArray = row.toString().split('')
            cavernMapRows.push(Util.convertStringArrayToNumberArray(stringArray))
        })

        return cavernMapRows;
    }

    createLargerCavernMap(fileName:string): any[]{
        let largeMap: any[] = [];
        let repeatTimes = 5;
        let rows =this.dataReader.convertFileToStringArray(fileName);
        rows.forEach(row => {
            let stringArray = row.toString().split('')
            let largerArray = (Util.convertStringArrayToNumberArray(stringArray));
            let numTile = 1;
            let addArray: any[] = [];
            while (numTile < repeatTimes){
                let numArray1 = [...largerArray]
                numArray1.forEach((num, index) => {
                    let newValue = num+numTile>9?num+numTile-9:num+numTile;
                    numArray1[index] = newValue
            })

            addArray = addArray.concat(numArray1);
            numTile++
            }
            largerArray = largerArray.concat(addArray)
           
            largeMap.push(largerArray);
        })

        //copy the largeMap
        
        let newRows : any[] = []
        //modify the values
        let numTile = 1;
        while(numTile < repeatTimes){
            const baseline = JSON.parse(JSON.stringify(largeMap));
            baseline.forEach((row: number[]) =>{
                row.forEach((value:number, index:number) =>{
                    let newValue = value+numTile>9?value+numTile-9:value+numTile;
                    row[index] = newValue
                })
                newRows.push(row)
            })
            
            numTile++
        }
            
        largeMap = largeMap.concat(newRows)
        return largeMap;

        


    }
}