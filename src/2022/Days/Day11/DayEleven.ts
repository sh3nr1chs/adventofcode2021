import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";
import { Util } from "../../../shared/util.js";
import { Monkey } from "./Monkey.js";
import { MonkeyReader } from "./MonkeyReader.js";

export class DayEleven extends Day implements DayInterface {
    dayName: string = '2022 Day Eleven';
    monkeyReader = new MonkeyReader(this.dataReader);

    monkeys:Monkey[] = [];

    partOne() {
        this.prepareDataForPuzzle();

        this.playRounds(20);
        let monkeyBusinessLevel = this.getMonkeyBusinessLevel();

        console.log(`The monkey business level after twenty rounds is ${monkeyBusinessLevel}`);
        
        return Util.checkAnswer(monkeyBusinessLevel, 66802);
    }

    partTwo() {
        this.prepareDataForPuzzle();

        this.playRounds(10000, false);
        let monkeyBusinessLevel = this.getMonkeyBusinessLevel();

        console.log(`The monkey business level after ten thousand rounds is ${monkeyBusinessLevel}`);
        
        return Util.checkAnswer(monkeyBusinessLevel, 21800916620);
    }

    getMonkeyBusinessLevel(){
        this.monkeys.sort((a,b) => b.inspectCount - a.inspectCount);
        return this.monkeys[0].inspectCount * this.monkeys[1].inspectCount;
    }

    playRounds(numRounds: number, experienceRelief:boolean = true){
        for(let round = 0; round < numRounds; round++){
            this.monkeys.forEach(monkey => {
                while(monkey.currentItems.length != 0) {
                    let item = monkey.currentItems.shift();
                    item = monkey.inspect(item);
                    if(experienceRelief){
                        item = this.experienceRelief(item?item:0);
                    }

                    monkey.throw(item?item: 0, this.monkeys);
                }
            })
        }
    }

    experienceRelief(item:number){
        return Math.floor(item/3)
    }

    prepareDataForPuzzle() {
        this.monkeys = this.monkeyReader.readMonkeys("src/2022/inputFiles/DayElevenInput.txt")
    }
    
}