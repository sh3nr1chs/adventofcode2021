import { TwentyTwentyOne } from "./2021/TwentyTwentyOne.js";
import { TwentyTwentyTwo } from "./2022/TwentyTwentyTwo.js";

const runPrevYears = false;

if (runPrevYears){
    let twentyTwentyOne = new TwentyTwentyOne();
    twentyTwentyOne.runAllDays();
}

let twentyTwentyTwo = new TwentyTwentyTwo();
twentyTwentyTwo.runAllDays();