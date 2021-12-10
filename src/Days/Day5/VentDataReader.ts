import { DataReader } from "../../shared/dataReader.js";
import { SpecializedDataReader } from "../../shared/SpecializedDataReader.js";
import { VentCoordinates } from "./VentCoordinates.js";

export class VentDataReader extends SpecializedDataReader{
    constructor(dataReader: DataReader){
        super(dataReader);
   }

   readVentCoordinates(fileName: string): VentCoordinates[] {
        let coordinates: VentCoordinates[] = [];
        let textByLine = this.dataReader.convertFileToStringArray(fileName);
        textByLine.forEach(coordString => {
            let splitCoords = coordString.split(' -> ');
            let ventCoord = new VentCoordinates(splitCoords[0], splitCoords[1]);
            coordinates.push(ventCoord);
        })

        return coordinates;
    }
}