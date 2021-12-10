import { DataReader } from "./dataReader.js";

export class SpecializedDataReader {
    dataReader: DataReader;
    
    constructor(dataReader:DataReader){
        this.dataReader = dataReader;
    }
}