import { Day } from "./Day.js";

export class Year {
    days: Day[] = [];
    yearName = '';
    
    runAllDays(){
        let totalCorrectForYear = 0;
        this.days.forEach(day => {
            day.solvePuzzlesForDay(day.dayName)
            totalCorrectForYear += day.numCorrect;
        })

        console.log(`${this.yearName} ::: ${totalCorrectForYear} / ${this.days.length * 2} CORRECT`)
    }

}