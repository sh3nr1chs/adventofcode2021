import { SpecializedDataReader } from "../../../shared/SpecializedDataReader.js";
import { Util } from "../../../shared/util.js";
import { HeightMap } from "./HeightMap.js";

export class HeightMapReader extends SpecializedDataReader {
    readHeightMap(fileName: string): HeightMap{
        let heightMapRows: any[] = []
        let rows =this.dataReader.convertFileToStringArray(fileName);
        rows.forEach(row => {
            let stringArray = row.toString().split('')
            heightMapRows.push(Util.convertStringArrayToNumberArray(stringArray))
        })

        return new HeightMap(heightMapRows);
    }
}