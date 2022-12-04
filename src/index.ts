import { DayOne } from "./2021/Days/Day1/DayOne.js";
import { DayTen } from "./2021/Days/Day10/DayTen.js";
import { DayEleven } from "./2021/Days/Day11/DayEleven.js";
import { DayTwelve } from "./2021/Days/Day12/DayTwelve.js";
import { DayThirteen } from "./2021/Days/Day13/DayThirteen.js";
import { DayFourteen } from "./2021/Days/Day14/DayFourteen.js";
import { DayFifteen } from "./2021/Days/Day15/DayFifteen.js";
import { DaySixteen } from "./2021/Days/Day16/DaySixteen.js";
import { DayTwo } from "./2021/Days/Day2/DayTwo.js";
import { DayThree } from "./2021/Days/Day3/DayThree.js";
import { DayFour } from "./2021/Days/Day4/DayFour.js";
import { DayFive } from "./2021/Days/Day5/DayFive.js";
import { DaySix } from "./2021/Days/Day6/DaySix.js";
import { DaySeven } from "./2021/Days/Day7/DaySeven.js";
import { DayEight } from "./2021/Days/Day8/DayEight.js";
import { DayNine } from "./2021/Days/Day9/DayNine.js";

import { DayOne as DayOne22 } from "./2022/Days/Day1/DayOne.js";
import { DayTwo as DayTwo22 } from "./2022/Days/Day2/DayTwo.js";
import { DayThree as DayThree22 } from "./2022/Days/Day3/DayThree.js";
import { DayFour as DayFour22 } from "./2022/Days/Day4/DayFour.js";

const runPrevYears = false;

if (runPrevYears){
    let twentyTwentyOne = [new DayOne(), new DayTwo(), new DayThree(), new DayFour(), new DayFive(), 
                    new DaySix(), new DaySeven(), new DayEight(), new DayNine(), new DayTen(),
                    new DayEleven(), new DayTwelve(), new DayThirteen(), new DayFourteen(), new DayFifteen(),
                    new DaySixteen()];
    let totalCorrectForYear = 0;
    twentyTwentyOne.forEach(day => {
        day.solvePuzzlesForDay(day.dayName);
        totalCorrectForYear += day.numCorrect;
    })

    console.log(`2021 ::: ${totalCorrectForYear} / ${twentyTwentyOne.length * 2} CORRECT`)
}

const runAllDays = false;
let twentyTwentyTwo = runAllDays? [new DayOne22(), new DayTwo22(), new DayThree22(), new DayFour22()] : [new DayFour22()];

let totalCorrectForYear = 0;
twentyTwentyTwo.forEach(day => {
    day.solvePuzzlesForDay(day.dayName);
    totalCorrectForYear += day.numCorrect;
})

console.log(`2022 ::: ${totalCorrectForYear} / ${twentyTwentyTwo.length * 2} CORRECT`)