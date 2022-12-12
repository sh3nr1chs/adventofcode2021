import { DataReader } from "../../../shared/dataReader.js";
import { SpecializedDataReader } from "../../../shared/SpecializedDataReader.js";
import { Util } from "../../../shared/util.js";
import { Monkey } from "./Monkey.js";

export class MonkeyReader extends SpecializedDataReader {

    constructor(dataReader: DataReader){
        super(dataReader);
    }

    readMonkeys(fileName:string){
        let monkeys: Monkey[] = [];
        let linesOfText = this.dataReader.convertFileToStringArray(fileName);
        let curMonkey: number = 0;
        let divisors : number[] = [];
        linesOfText.forEach(line=> {
            let marker = line.split(': ');
            if (marker[0].indexOf('Monkey') === 0) {
                monkeys.push(new Monkey());
            } else if (marker[0].indexOf('Starting items') != -1){
                let monkey = monkeys[curMonkey];
               
                let items = Util.convertStringArrayToNumberArray(marker[1].split(', '))
                monkey.currentItems = [...items];
            } else if (marker[0].indexOf('Operation') != -1) {
                let operationParts = marker[1].split(" ");
                let firstValue = operationParts[2];
                let operation = operationParts[3];
                let secondValue = operationParts[4];
                monkeys[curMonkey].inspect = Function("old", `this.inspectCount++;return ${firstValue} ${operation} ${secondValue}`)
            } else if (marker[0].indexOf('Test') != -1) {
                let operationParts =marker[1].split(" ");
                divisors.push(parseInt(operationParts[2]));
                monkeys[curMonkey].divideBy = parseInt(operationParts[2]);
            } else if (marker[0].indexOf('If true') != -1) {
                let operationParts =marker[1].split(" ");
                monkeys[curMonkey].monkeyForTrue = parseInt(operationParts[3]);
            } else if (marker[0].indexOf('If false') != -1) {
                let operationParts =marker[1].split(" ");
                monkeys[curMonkey].monkeyForFalse = parseInt(operationParts[3]);
            } else {
                curMonkey++;
            }

        })

        let mult = 1;
        divisors.forEach(divisor => mult = mult * divisor);
        monkeys.forEach(monkey => {
            monkey.recalculateItem = Function("item", `return item % ${mult}`)
        })

        return monkeys;
    }
}