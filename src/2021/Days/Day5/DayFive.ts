import { Day } from "../../../shared/Day.js";
import { VentMapper } from "./VentMapper.js";
import { VentCoordinates } from "./VentCoordinates.js";
import { Util } from "../../../shared/util.js";
import { DayInterface } from "../../../shared/DayInterface";
import { VentDataReader } from "./VentDataReader.js";

export class DayFive extends Day implements DayInterface{
    dayName = 'Day Five'
    ventDataReader = new VentDataReader(this.dataReader);
    ventMapper = new VentMapper();

    ventCoordinates : VentCoordinates[]= [];
    
    private solvePuzzle(array: VentCoordinates[], correctSolution: number){
        this.ventMapper.mapVents(array);
        let solution = this.ventMapper.countDangerZones();
        console.log(`${solution} danger zones`);
        return Util.checkAnswer(solution, correctSolution);
    }

    partOne() {
        this.prepareDataForPuzzle();
        let filteredCoords = this.filterOnlyStraightLines(this.ventCoordinates);

        return this.solvePuzzle(filteredCoords, 7473)
    }

    partTwo() {
        this.prepareDataForPuzzle();
      
        return this.solvePuzzle(this.ventCoordinates, 24164);
    }

    prepareDataForPuzzle(): void {
            this.ventCoordinates = this.ventDataReader.readVentCoordinates("src/2021/inputFiles/dayFiveInput.txt");
            this.ventMapper.resetMap();
    }

    private filterOnlyStraightLines(coords: VentCoordinates[]) {
        return coords.filter(coord => coord.start[0] === coord.end[0] || coord.start[1] === coord.end[1]);
    }
    
}