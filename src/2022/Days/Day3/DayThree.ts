import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";
import { Util } from "../../../shared/util.js";

export class DayThree extends Day implements DayInterface {
    dayName: string = '2022 Day Three';

    ruckSacks:string[] = [];

    partOne() {
        this.prepareDataForPuzzle();

        let splitSacks = this.splitSacks();
        let sumOfPriorities = this.getSumOfPrioritiesBySack(splitSacks);

        console.log(`The sum of the mis-packed item priorities is ${sumOfPriorities}`);
        return Util.checkAnswer(sumOfPriorities, 7872);
    }

    partTwo() {
        this.prepareDataForPuzzle();

        let sumOfPriorities = this.getSumOfPrioritiesByBadge();

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

    getSumOfPrioritiesBySack(sacks: Array<Array<string>>){
        let sum = 0;
        sacks.forEach(sack => {
            let dupItem = this.getDuplicateItems(sack[0].split(""), sack[1].split(""))[0];
            sum += this.getPriorityOfItem(dupItem);
        })

        return sum;
    }

    getSumOfPrioritiesByBadge() {
        let sum = 0;
        let numberOfRuckSacks = this.ruckSacks.length;
        for (let i = 0; i < numberOfRuckSacks; i=i+3) {
            let firstSack = this.ruckSacks[i];
            let secondSack = this.ruckSacks[i+1];
            let thirdSack = this.ruckSacks[i+2];

            let dupsFirstAndSecond : string[]= this.getDuplicateItems(firstSack.split(""), secondSack.split(""));
            let badgeForGroup = this.getDuplicateItems(dupsFirstAndSecond, thirdSack.split(""))[0];
            sum += this.getPriorityOfItem(badgeForGroup);
        }
        return sum;
    }

    getDuplicateItems(groupOne: string[], groupTwo: string[]) {
        let dups : string[]= [];
        groupOne.forEach(item => {
            if (dups.indexOf(item) === -1 && groupTwo.indexOf(item) != -1) {
                dups.push(item);
            }
        })

        return dups;
    }

    getPriorityOfItem(item: string) {
        let priority = 0;
        let itemCharCode = item.charCodeAt(0);
        if (itemCharCode < 97) {
            priority = itemCharCode-38;
        } else {
            priority = itemCharCode-96;
        } 

        return priority;
    }
}