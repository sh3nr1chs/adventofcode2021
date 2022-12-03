import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";
import { Util } from "../../../shared/util.js";

export class DayThree extends Day implements DayInterface {
    dayName: string = '2022 Day Three';

    ruckSacks:string[] = [];

    partOne() {
        this.prepareDataForPuzzle();

        let splitSacks = this.splitSacks();
        let duplicateItems = this.findDupsPerSack(splitSacks);
        let sumOfPriorities = this.getSumOfPriorities(duplicateItems);

        console.log(`The sum of the mis-packed item priorities is ${sumOfPriorities}`);
        return Util.checkAnswer(sumOfPriorities, 7872);
    }

    partTwo() {
        this.prepareDataForPuzzle();

        let badgeItem = this.findDupsPerGroupOfThreeSacks();
        let sumOfPriorities = this.getSumOfPriorities(badgeItem);

        console.log(`The sum of the badge item priorities is ${sumOfPriorities}`);
        return Util.checkAnswer(sumOfPriorities, 2497);
    }

    prepareDataForPuzzle() {
        if (this.ruckSacks.length === 0){
            this.ruckSacks = this.dataReader.convertFileToStringArray("src/2022/inputFiles/DayThreeInput.txt");
        }
    }

    splitSacks(){
        let splitSacks: Array<any> = [];
        this.ruckSacks.forEach(sack => {
            let numItems: number = sack.length;
            let numItemsPerCompartment = numItems / 2;

            let compartmentOne = sack.substring(0, numItemsPerCompartment);
            let compartmentTwo = sack.substring(numItemsPerCompartment);

            splitSacks.push([compartmentOne, compartmentTwo]);
        })

        return splitSacks;
    }

    findDupsPerSack(sacks: Array<Array<string>>){
        let dups: Array<string> = [];
        sacks.forEach(sack => {
            let dupFound = false;
            let splitSack = sack[0].split("");
           splitSack.forEach(item => {
               
                if(!dupFound && sack[1].indexOf(item) != -1) {
                    dups.push(item);
                    dupFound = true;
                }
            })    
        })

        return dups;
    }

    findDupsPerGroupOfThreeSacks() {
        let badges: Array<string> = [];
        let numberOfRuckSacks = this.ruckSacks.length;
        for (let i = 0; i < numberOfRuckSacks; i=i+3) {
            let firstSack = this.ruckSacks[i];
            let secondSack = this.ruckSacks[i+1];
            let thirdSack = this.ruckSacks[i+2];

            //compareFirstSackAndSecondSack
            let dupsFirstAndSecond : string[]= [];
            let splitFirstSack = firstSack.split("");
            splitFirstSack.forEach(item => {
                if(dupsFirstAndSecond.indexOf(item) === -1 && secondSack.indexOf(item) != -1) {
                    dupsFirstAndSecond.push(item);
                }
            })

            let dupFound = false;
            dupsFirstAndSecond.forEach(item => {
                if(!dupFound && thirdSack.indexOf(item) != -1) {
                    badges.push(item);
                    dupFound = true;
                }
            })

        }
        return badges;
    }

    getSumOfPriorities(items :string[]){
        let sum = 0;
        items.forEach(item => {
            let itemCharCode = item.charCodeAt(0);
            if (itemCharCode < 97) {
                sum += itemCharCode-38;
            } else {
                sum += itemCharCode-96;
            }
        })

        return sum;
    }
}