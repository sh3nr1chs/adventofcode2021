import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface";
import { CavernMapCreator } from "./CavernMapCreator.js";
import { DijkstraService } from "./DijkstraService.js";

export class DayFifteen extends Day implements DayInterface {
    dayName: string = "Day Fifteen";

    cavernMapCreator = new CavernMapCreator(this.dataReader);
    dijkstraService = new DijkstraService();
    
    cavernMap: any[] = [];

    partOne(): boolean {
        this.prepareDataForPuzzle();
        let shortestPath = this.dijkstraService.getShortestPath(this.cavernMap);
        console.log(`The shortest path is ${shortestPath}.`)
        return Util.checkAnswer(shortestPath, 621);
    }

    partTwo(): boolean {
        this.prepareDataForPuzzle();
        let largerMap = this.cavernMapCreator.createLargerCavernMap(this.cavernMap, 5);
 
        let shortestPath = this.dijkstraService.getShortestPath(largerMap);
        console.log(`The shortest path is ${shortestPath}.`)

        return Util.checkAnswer(shortestPath, 2904);
    }

    prepareDataForPuzzle() {
        if(this.cavernMap.length === 0){
            this.cavernMap = this.cavernMapCreator.readCavernMap("src/2021/inputFiles/dayFifteenInput.txt")
        }
 
    }
}