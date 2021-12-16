import { TwoDArrayService } from "../../shared/2DArrayService.js";

export class DijkstraService {
    getShortestPath(mapToTraverse: any[]){
        
        let twoDArrayServiceForMap = new TwoDArrayService(mapToTraverse)

        let endIndex = [mapToTraverse.length-1, mapToTraverse.length-1];
        let numLocations = mapToTraverse.length * mapToTraverse.length;
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
            let adjacentIndexes = twoDArrayServiceForMap.getAdjacentIndices(currentIndex, false);

            adjacentIndexes.forEach(adjacentIndex => {
                
                if(twoDArrayServiceForMap.isValidIndex(adjacentIndex) && !visitedIndexes.has(`${adjacentIndex[0]},${adjacentIndex[1]}`)){
                    // console.log(`checking valid index [${adjacentIndex}] | ${this.cavernMap[adjacentIndex[1]][adjacentIndex[0]]}`)

                    let distanceForAdjacentIndex = mapToTraverse[adjacentIndex[1]][adjacentIndex[0]];
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

    private getCurrentDistance(distanceMap: Map<string, number>, index: number[]){
        let valueForKey = distanceMap.get(`${index[0]},${index[1]}`);
        let curNumForKey: number = valueForKey !== undefined?valueForKey:Number.MAX_SAFE_INTEGER;
        return curNumForKey;
    }
}