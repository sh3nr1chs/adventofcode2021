import { Year } from "../shared/Year.js";
import { DayOne } from "./Days/Day1/DayOne.js";
import { DayTwo } from "./Days/Day2/DayTwo.js";
import { DayThree } from "./Days/Day3/DayThree.js";
import { DayFour } from "./Days/Day4/DayFour.js";


export class TwentyTwentyTwo extends Year {
    yearName = '2022';

    constructor() {
        super();
        
        let runAllDays = true;
        this.days = runAllDays? [new DayOne(), new DayTwo(), new DayThree(), new DayFour()] : [new DayFour()];
    }
}