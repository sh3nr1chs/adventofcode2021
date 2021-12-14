import { Day } from "../Day.js";
import { DayInterface } from "../DayInterface.js";
import { Paper } from "./Paper.js";
import { TransparentPaperReader } from "./TransparentPaperReader.js";

export class DayThirteen extends Day implements DayInterface {
    dayName: string = "Day Thirteen";

    transparentPaperReader: TransparentPaperReader = new TransparentPaperReader(this.dataReader);
    paper = new Paper();

    markIndexes: any[] = [];
    folds: any[] = [];

    partOne() {
        this.prepareDataForPuzzle()
        this.paper.markPaper(this.markIndexes)
        this.paper.foldPaper([this.folds[0]]);
        let numMarks = this.paper.countMarks();
        // this.paper.printPaper();

        console.log(`Num marks after a single fold: ${numMarks}`)
        return false;
    }

    partTwo() {
        this.prepareDataForPuzzle()
        this.paper.markPaper(this.markIndexes)
        this.paper.foldPaper(this.folds);
        let numMarks = this.paper.countMarks();
        this.paper.printPaper();

        console.log(`Num marks after all folds: ${numMarks}`)
        return false;
    }

    prepareDataForPuzzle() {
        let fileName = "inputFiles/testInput.txt"
        this.markIndexes = this.transparentPaperReader.readMarks(fileName)
        this.folds = this.transparentPaperReader.readFolds(fileName)
    }

}