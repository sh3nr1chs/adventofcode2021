import { SpecializedDataReader } from "../../shared/SpecializedDataReader.js";
import { Util } from "../../shared/util.js";

export class TransparentPaperReader extends SpecializedDataReader {
    readMarks(fileName:string) {
        let markIndexes: any[] = [];
        let marks: any[] = this.dataReader.convertFileToStringArray(fileName).filter(line => line.indexOf('fold') === -1);
        marks.forEach(markString => {
            if (markString !== ''){
                let splitMark = markString.split(',');
                splitMark = Util.convertStringArrayToNumberArray(splitMark)
                markIndexes.push([splitMark[0], splitMark[1]])
            }
        })

        return markIndexes;
    }

    readFolds(fileName: string) {
        let folds: string[] = [];
        let foldLines: any[] = this.dataReader.convertFileToStringArray(fileName).filter(line => line.indexOf('fold') !== -1);
        foldLines.forEach(foldLine => {
            let splitFold = foldLine.split(" ");
            folds.push(splitFold[2])
        })

        return folds;
    }
}