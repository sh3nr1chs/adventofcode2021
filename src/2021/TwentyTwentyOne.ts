import { Year } from "../shared/Year.js";
import { DayOne } from "./Days/Day1/DayOne.js";
import { DayTen } from "./Days/Day10/DayTen.js";
import { DayEleven } from "./Days/Day11/DayEleven.js";
import { DayTwelve } from "./Days/Day12/DayTwelve.js";
import { DayThirteen } from "./Days/Day13/DayThirteen.js";
import { DayFourteen } from "./Days/Day14/DayFourteen.js";
import { DayFifteen } from "./Days/Day15/DayFifteen.js";
import { DaySixteen } from "./Days/Day16/DaySixteen.js";
import { DayTwo } from "./Days/Day2/DayTwo.js";
import { DayThree } from "./Days/Day3/DayThree.js";
import { DayFour } from "./Days/Day4/DayFour.js";
import { DayFive } from "./Days/Day5/DayFive.js";
import { DaySix } from "./Days/Day6/DaySix.js";
import { DaySeven } from "./Days/Day7/DaySeven.js";
import { DayEight } from "./Days/Day8/DayEight.js";
import { DayNine } from "./Days/Day9/DayNine.js";

export class TwentyTwentyOne extends Year {
    yearName = '2021';

    constructor() {
        super();
        this.days = [new DayOne(), new DayTwo(), new DayThree(), new DayFour(), new DayFive(), 
        new DaySix(), new DaySeven(), new DayEight(), new DayNine(), new DayTen(),
        new DayEleven(), new DayTwelve(), new DayThirteen(), new DayFourteen(), new DayFifteen(),
        new DaySixteen()];
    }
}