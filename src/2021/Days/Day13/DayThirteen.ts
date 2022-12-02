import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface";
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

        console.log(`Num marks after a single fold: ${numMarks}`)
        return Util.checkAnswer(numMarks, 655);
    }

    partTwo() {
        this.prepareDataForPuzzle()
        this.paper.markPaper(this.markIndexes)
        this.paper.foldPaper(this.folds);
        let numMarks = this.paper.countMarks();
        this.paper.printPaper();

        console.log(`Num marks after all folds: ${numMarks}`)
        console.log("The printed paper should display JPZCUAUR for the code.")
        return Util.checkAnswer(numMarks, 95);
    }

    prepareDataForPuzzle() {
        let fileName = "src/2021/inputFiles/dayThirteenInput.txt"
        this.markIndexes = this.transparentPaperReader.readMarks(fileName)
        this.folds = this.transparentPaperReader.readFolds(fileName)
    }

}