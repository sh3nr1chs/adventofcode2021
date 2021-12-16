import { TwoDArrayService } from "../../shared/2DArrayService.js";
import { Util } from "../../shared/util.js";
import { Day } from "../Day.js";
import { DayInterface } from "../DayInterface.js";
import { CavernMapReader } from "./CavernMapReader.js";

export class DayFifteen extends Day implements DayInterface {
    dayName: string = "Day Fifteen";
    cavernMapReader = new CavernMapReader(this.dataReader);
    twoDArrayUtilForCavernMap = new TwoDArrayService([]);
    cavernMap: any[] = [];

    partOne(): boolean {
        this.prepareDataForPuzzle();
        let shortestPath = this.traverseUsingDijkstraDistanceMap();
        console.log(`The shortest path is ${shortestPath}.`)
        return Util.checkAnswer(shortestPath, 621);
    }

    partTwo(): boolean {
        this.cavernMap = this.cavernMapReader.createLargerCavernMap("inputFiles/dayFifteenInput.txt");
        this.twoDArrayUtilForCavernMap = new TwoDArrayService(this.cavernMap);
        // this.twoDArrayUtilForCavernMap.printArray();
        let shortestPath = this.traverseUsingDijkstraDistanceMap2();
        console.log(`The shortest path is ${shortestPath}.`)

        return false;
    }

    prepareDataForPuzzle() {
        this.cavernMap = this.cavernMapReader.readCavernMap("inputFiles/dayFifteenInput.txt")
        this.twoDArrayUtilForCavernMap = new TwoDArrayService(this.cavernMap)
    }

    private initDistanceFromSource(){
        const distanceFromSource = JSON.parse(JSON.stringify(this.cavernMap))

        distanceFromSource.forEach((row: number[], rowIndex:number) => {
            row.forEach((location:number, colIndex: number) => distanceFromSource[rowIndex][colIndex] = Number.MAX_SAFE_INTEGER);
        })
        distanceFromSource[0][0] = 0;
        return distanceFromSource;
    }

    private traverseUsingDijkstraDistanceArray(){
        let endIndex = [this.cavernMap[0].length-1, this.cavernMap.length-1];
        let numLocations = this.cavernMap[0].length * this.cavernMap.length;
        console.log(`Going from [0,0] to [${endIndex}], with ${numLocations} locations in the cavern.`)

        let finished = false;
        let visitedIndexes: string[] = [];

        let distanceFromASource = this.initDistanceFromSource();
        
        let count = 0;
        while (!finished) {
            let shortestDistanceOfNonVisitedIndex = this.getShortestDistanceOfNonVisitedIndex(distanceFromASource, visitedIndexes);
            let currentIndex = shortestDistanceOfNonVisitedIndex[0];
            // console.log(`currentIndex: [${currentIndex}]`)
            let currentPathDistance = distanceFromASource[currentIndex[1]][currentIndex[0]];
            // console.log(`current Path distance: ${currentPathDistance}`)
            let adjacentIndexes = this.twoDArrayUtilForCavernMap.getAdjacentIndices(currentIndex, false);

            adjacentIndexes.forEach(adjacentIndex => {
                
                if(this.twoDArrayUtilForCavernMap.isValidIndex(adjacentIndex) && !Util.indexIsAlreadyInList2(visitedIndexes, `${adjacentIndex[0]},${adjacentIndex[1]}`)){
                    // console.log(`checking valid index [${adjacentIndex}] | ${this.cavernMap[adjacentIndex[1]][adjacentIndex[0]]}`)
                    let currentPathDistance = distanceFromASource[currentIndex[1]][currentIndex[0]];
                    let distanceForAdjacentIndex = this.cavernMap[adjacentIndex[1]][adjacentIndex[0]];
                    let currentDistanceFromSourceForAdjacentIndex = distanceFromASource[adjacentIndex[1]][adjacentIndex[0]];
                    let newDistanceFromSourceForAdjacentIndex = currentPathDistance + distanceForAdjacentIndex;

                    // console.log(`comparing distances - cur: ${currentDistanceFromSourceForAdjacentIndex} v new: ${newDistanceFromSourceForAdjacentIndex}`)
                    //update distance from source for adjacent indexes
                    if(newDistanceFromSourceForAdjacentIndex < currentDistanceFromSourceForAdjacentIndex){
                        distanceFromASource[adjacentIndex[1]][adjacentIndex[0]] = newDistanceFromSourceForAdjacentIndex;
                    }
                    // console.log(`Distance from source to ${adjacentIndex} is ${distanceFromASource[adjacentIndex[1]][adjacentIndex[0]]}`)
                }
            })
            visitedIndexes.push(`${currentIndex[0]},${currentIndex[1]}`);
            count++;

            console.log(`~~~~~~`)
            finished = visitedIndexes.length === numLocations;
        }

        return distanceFromASource[endIndex[1]][endIndex[0]];
    }

    private getCurrentDistance(distanceMap: Map<string, number>, index: number[]){
        let valueForKey = distanceMap.get(`${index[0]},${index[1]}`);
        let curNumForKey: number = valueForKey !== undefined?valueForKey:Number.MAX_SAFE_INTEGER;
        return curNumForKey;
    }

    private traverseUsingDijkstraDistanceMap(){
        let endIndex = [this.cavernMap[0].length-1, this.cavernMap.length-1];
        let numLocations = this.cavernMap[0].length * this.cavernMap.length;
        console.log(`Going from [0,0] to [${endIndex}], with ${numLocations} locations in the cavern.`)

        let finished = false;
        let visitedIndexes: string[] = [];

        let distanceFromASource : Map<string, number> = new Map();
        distanceFromASource.set('0,0', 0);
        
        let count = 0;
        while (!finished) {
            let currentPathDistance: any[] = distanceFromASource.values().next().value;
            let currentIndexString = distanceFromASource.keys().next().value;
            // console.log(`currentIndex: [${currentIndex}]`)
            // let currentPathDistance = shortestDistanceOfNonVisitedIndex[1];
            // console.log(`current Path distance: ${currentPathDistance}`)
            let currentIndex = [parseInt(currentIndexString.split(',')[0]), parseInt(currentIndexString.split(',')[1])]
            let adjacentIndexes = this.twoDArrayUtilForCavernMap.getAdjacentIndices(currentIndex, false);

            adjacentIndexes.forEach(adjacentIndex => {
                
                if(this.twoDArrayUtilForCavernMap.isValidIndex(adjacentIndex) && !Util.indexIsAlreadyInList2(visitedIndexes, `${adjacentIndex[0]},${adjacentIndex[1]}`)){
                    // console.log(`checking valid index [${adjacentIndex}] | ${this.cavernMap[adjacentIndex[1]][adjacentIndex[0]]}`)

                    let distanceForAdjacentIndex = this.cavernMap[adjacentIndex[1]][adjacentIndex[0]];
                    let currentDistanceFromSourceForAdjacentIndex = this.getCurrentDistance(distanceFromASource, adjacentIndex);
                    let newDistanceFromSourceForAdjacentIndex = currentPathDistance + distanceForAdjacentIndex;

                    // console.log(`comparing distances - cur: ${currentDistanceFromSourceForAdjacentIndex} v new: ${newDistanceFromSourceForAdjacentIndex}`)
                    //update distance from source for adjacent indexes
                    if(newDistanceFromSourceForAdjacentIndex < currentDistanceFromSourceForAdjacentIndex){
                        distanceFromASource.set(`${adjacentIndex[0]},${adjacentIndex[1]}`, newDistanceFromSourceForAdjacentIndex);
                    }

                    
                    // console.log(`Distance from source to ${adjacentIndex} is ${distanceFromASource[adjacentIndex[1]][adjacentIndex[0]]}`)
                }
            })
            distanceFromASource = new Map([...distanceFromASource.entries()].sort((a,b) => a[1]-b[1]));
            visitedIndexes.push(`${currentIndex[0]},${currentIndex[1]}`);
            // let keyToDel = [currentIndex[0],currentIndex[1]];
            if(currentIndexString === `${endIndex[0]},${endIndex[1]}`){
                finished = true;
            } else {
            distanceFromASource.delete(currentIndexString)
            }
            count++;

            // console.log(`~~~~~~`)
            
            
        }

        return this.getCurrentDistance(distanceFromASource, endIndex);
    }

    private traverseUsingDijkstraDistanceMap2(){
        let endIndex = [this.cavernMap[0].length-1, this.cavernMap.length-1];
        let numLocations = this.cavernMap[0].length * this.cavernMap.length;
        console.log(`Going from [0,0] to [${endIndex}], with ${numLocations} locations in the cavern.`)

        let finished = false;
        let visitedIndexes: Set<string> = new Set();

        let distanceFromASource : Map<string, number> = new Map();
        distanceFromASource.set('0,0', 0);
        
        let count = 0;
        while (!finished) {
            let currentPathDistance: any[] = distanceFromASource.values().next().value;
            let currentIndexString = distanceFromASource.keys().next().value;
            // console.log(`currentIndex: [${currentIndex}]`)
            // let currentPathDistance = shortestDistanceOfNonVisitedIndex[1];
            // console.log(`current Path distance: ${currentPathDistance}`)
            let currentIndex = [parseInt(currentIndexString.split(',')[0]), parseInt(currentIndexString.split(',')[1])]
            let adjacentIndexes = this.twoDArrayUtilForCavernMap.getAdjacentIndices(currentIndex, false);

            adjacentIndexes.forEach(adjacentIndex => {
                
                if(this.twoDArrayUtilForCavernMap.isValidIndex(adjacentIndex) && !visitedIndexes.has(`${adjacentIndex[0]},${adjacentIndex[1]}`)){
                    // console.log(`checking valid index [${adjacentIndex}] | ${this.cavernMap[adjacentIndex[1]][adjacentIndex[0]]}`)

                    let distanceForAdjacentIndex = this.cavernMap[adjacentIndex[1]][adjacentIndex[0]];
                    let currentDistanceFromSourceForAdjacentIndex = this.getCurrentDistance(distanceFromASource, adjacentIndex);
                    let newDistanceFromSourceForAdjacentIndex = currentPathDistance + distanceForAdjacentIndex;

                    // console.log(`comparing distances - cur: ${currentDistanceFromSourceForAdjacentIndex} v new: ${newDistanceFromSourceForAdjacentIndex}`)
                    //update distance from source for adjacent indexes
                    if(newDistanceFromSourceForAdjacentIndex < currentDistanceFromSourceForAdjacentIndex){
                        distanceFromASource.set(`${adjacentIndex[0]},${adjacentIndex[1]}`, newDistanceFromSourceForAdjacentIndex);
                    }

                    
                    // console.log(`Distance from source to ${adjacentIndex} is ${distanceFromASource[adjacentIndex[1]][adjacentIndex[0]]}`)
                }
            })
            distanceFromASource = new Map([...distanceFromASource.entries()].sort((a,b) => a[1]-b[1]));
            visitedIndexes.add(`${currentIndex[0]},${currentIndex[1]}`);
            // let keyToDel = [currentIndex[0],currentIndex[1]];
            if(currentIndexString === `${endIndex[0]},${endIndex[1]}`){
                finished = true;
            } else {
            distanceFromASource.delete(currentIndexString)
            }
            count++;

            // console.log(`~~~~~~`)
            
            
        }

        return this.getCurrentDistance(distanceFromASource, endIndex);
    }

    private getShortestDistanceOfNonVisitedIndex(distanceFromSource: any[], visitedIndexes: string[]): any[]{
        let shortestDistance = Number.MAX_SAFE_INTEGER;
        let index = undefined;
        distanceFromSource.forEach((row, rowIndex) => {
            row.forEach((distance: number, colIndex:number) => {
                let checkingIndex = [colIndex, rowIndex]
                if(distance < shortestDistance && !Util.indexIsAlreadyInList2(visitedIndexes, `${checkingIndex[0]},${checkingIndex[1]}`)) {
                    shortestDistance = distance;
                    index = checkingIndex;
                }
            })
        })

        return [index, shortestDistance];
    }

}