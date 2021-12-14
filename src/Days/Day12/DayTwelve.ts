import { Util } from "../../shared/util.js";
import { Day } from "../Day.js";
import { DayInterface } from "../DayInterface.js";
import { CaveConnectionReader } from "./CaveConnectionReader.js";

export class DayTwelve extends Day implements DayInterface{
    dayName: string = "Day Twelve";

    caveConnectionReader: CaveConnectionReader = new CaveConnectionReader(this.dataReader);
    caveSystem: Map<string, Set<string>> = new Map();

    partOne(): boolean {
        this.prepareDataForPuzzle();
        let paths = this.getPaths(false);
        console.log(`Number of Paths: ${paths.length}`)
        return Util.checkAnswer(paths.length, 4186);
    }

    partTwo(): boolean {
        this.prepareDataForPuzzle();
        let paths = this.getPaths(true);
        console.log(`Number of Paths: ${paths.length}`)
        return Util.checkAnswer(paths.length, 92111);
    }

    private haveAnySmallCavesBeenVisitedTwice(path:string){
        let haveAnySmallCavesBeenVisitedTwice = false;
        let smallCavesInPath = path.split(',').filter(cave => cave.toLowerCase() === cave);
        
        smallCavesInPath.every(smallCave => {
            let count = smallCavesInPath.filter((cave1: string) => smallCave === cave1).length
            if (count === 2) {
                haveAnySmallCavesBeenVisitedTwice = true;
                return false;
            } else {
                return true;
            }
        })

        return haveAnySmallCavesBeenVisitedTwice;
    }

    private isValidAdditionToPath(cave: string, path: string, isAllowedToVisitSingleSmallCaveTwice: boolean){
        let isValid = true;
        if (cave === cave.toLowerCase()){
            if (!isAllowedToVisitSingleSmallCaveTwice && path.indexOf(cave) !== -1){
                isValid = false;
            }
            if(isAllowedToVisitSingleSmallCaveTwice) {
                if(path.indexOf(cave) !== -1 && this.haveAnySmallCavesBeenVisitedTwice(path)){
                    isValid = false;
                }
            }
            
        }
        return isValid
    }

    private getPaths(canVisitSingleSmallCaveTwice:boolean, srcCave: string='start', paths:string[]=[], currentPath = 'start'){
       let destCaves = this.caveSystem.get(srcCave);
       if (srcCave != 'end') {
           //make a copy of the current path before going into the for each
            let curPath = currentPath;
            destCaves?.forEach(cave => {
                if (this.isValidAdditionToPath(cave, curPath, canVisitSingleSmallCaveTwice)){
                    currentPath = curPath.concat(`,${cave}`);
                    this.getPaths(canVisitSingleSmallCaveTwice, cave, paths, currentPath);
                }
           })
       } else {
           //you've reached a valid path!  Add it to the list.
           paths.push(currentPath)
       }

       return paths
    }

    prepareDataForPuzzle() {
        if(this.caveSystem.size === 0) {
            this.caveSystem = this.caveConnectionReader.readCaveConnections("inputFiles/dayTwelveInput.txt")
        }
    }

}