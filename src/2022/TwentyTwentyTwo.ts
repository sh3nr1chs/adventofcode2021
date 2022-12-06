import { Year } from "../shared/Year.js";
import { DayOne } from "./Days/Day1/DayOne.js";
import { DayTwo } from "./Days/Day2/DayTwo.js";
import { DayThree } from "./Days/Day3/DayThree.js";
import { DayFour } from "./Days/Day4/DayFour.js";
import { DayFive } from "./Days/Day5/DayFive.js";
import { DaySix } from "./Days/Day6/DaySix.js";


export class TwentyTwentyTwo extends Year {
    yearName = '2022';

    constructor() {
        super();
        
        let runAllDays = false;
        this.days = runAllDays? [new DayOne(), new DayTwo(), new DayThree(), new DayFour(), new DayFive(), new DaySix()] : [new DaySix()];
    }
}