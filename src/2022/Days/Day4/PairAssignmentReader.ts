import { SpecializedDataReader } from "../../../shared/SpecializedDataReader.js";
import { DataReader } from "../../../shared/dataReader.js";
import { PairAssignment } from "./PairAssignment.js";

export class PairAssignmentReader extends SpecializedDataReader {

    constructor(dataReader: DataReader){
        super(dataReader);
   }

   readPairAssignments(fileName: string): PairAssignment[]  {
    let pairAssignments: PairAssignment[] = [];
    let textByLine = this.dataReader.convertFileToStringArray(fileName);
    textByLine.forEach(line => {
        let pairAssignment = new PairAssignment(line);
        pairAssignments.push(pairAssignment);
    })

    return pairAssignments;
   }
}