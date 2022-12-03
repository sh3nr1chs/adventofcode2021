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
        let dups: string[] = [];
        sacks.forEach(sack => {
            dups.push(this.getDuplicateItems(sack[0].split(""), sack[1].split(""))[0]);
        })

        return dups;
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

    findDupsPerGroupOfThreeSacks() {
        let badges: Array<string> = [];
        let numberOfRuckSacks = this.ruckSacks.length;
        for (let i = 0; i < numberOfRuckSacks; i=i+3) {
            let firstSack = this.ruckSacks[i];
            let secondSack = this.ruckSacks[i+1];
            let thirdSack = this.ruckSacks[i+2];

            let dupsFirstAndSecond : string[]= this.getDuplicateItems(firstSack.split(""), secondSack.split(""));
            badges.push(this.getDuplicateItems(dupsFirstAndSecond, thirdSack.split(""))[0]);
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