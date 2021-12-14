import { DayOne } from "./Days/Day1/DayOne.js";
import { DayTen } from "./Days/Day10/DayTen.js";
import { DayEleven } from "./Days/Day11/DayEleven.js";
import { DayTwo } from "./Days/Day2/DayTwo.js";
import { DayThree } from "./Days/Day3/DayThree.js";
import { DayFour } from "./Days/Day4/DayFour.js";
import { DayFive } from "./Days/Day5/DayFive.js";
import { DaySix } from "./Days/Day6/DaySix.js";
import { DaySeven } from "./Days/Day7/DaySeven.js";
import { DayEight } from "./Days/Day8/DayEight.js";
import { DayNine } from "./Days/Day9/DayNine.js";


let pastDays = [new DayOne(), new DayTwo(), new DayThree(), new DayFour(), new DayFive(), 
                new DaySix(), new DaySeven(), new DayEight(), new DayNine(), new DayTen(),
                new DayEleven()];
let totalCorrect = 0;
pastDays.forEach(day => {
    day.solvePuzzlesForDay(day.dayName);
    totalCorrect += day.numCorrect;
})

console.log(`${totalCorrect} / ${pastDays.length * 2} CORRECT`)