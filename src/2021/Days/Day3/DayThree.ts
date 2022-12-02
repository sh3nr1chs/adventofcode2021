import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface";
import { BitReader } from "./bitReader.js";

export class DayThree extends Day implements DayInterface {
    dayName = 'Day Three'
    
    bitReader = new BitReader();

    diagnosticReadings : string[]= [];

    partOne() {
        this.prepareDataForPuzzle();

        let gamma = this.bitReader.determineCommonBitForEachPlace(this.diagnosticReadings, 'most');
        let gammaDecimalValue = this.bitReader.convertBitsToDecimal(gamma)
    
        let epsilon = this.bitReader.determineCommonBitForEachPlace(this.diagnosticReadings, 'least');
        let epsilonDecimalValue = this.bitReader.convertBitsToDecimal(epsilon)
    
        let solution = gammaDecimalValue * epsilonDecimalValue;
        console.log(`gamma ${gammaDecimalValue}, epsilon ${epsilonDecimalValue}, mult ${solution}`);
        return Util.checkAnswer(solution, 1997414);
    }
    
    partTwo() {
        this.prepareDataForPuzzle();

        let oxygenGen = this.bitReader.filterReadings(this.diagnosticReadings, 1, 'most')
        let oxygenGenDecimal = this.bitReader.convertBitsToDecimal(oxygenGen);

        let co2Rating = this.bitReader.filterReadings(this.diagnosticReadings, 0, 'least')
        let co2RatingDecimal = this.bitReader.convertBitsToDecimal(co2Rating);

        let solution = oxygenGenDecimal * co2RatingDecimal
        console.log(`oxygen ${oxygenGenDecimal}, co2 ${co2RatingDecimal}, mult ${solution}`);
        return Util.checkAnswer(solution, 1032597)
    }

    prepareDataForPuzzle(): void {
        if (this.diagnosticReadings.length === 0){
            this.diagnosticReadings = this.dataReader.convertFileToStringArray("src/2021/inputFiles/dayThreeInput.txt");
        }
    }
    
}