import { TwoDArrayService } from "../../../shared/2DArrayService.js";

export class DijkstraService {
    
    getShortestPath(mapToTraverse: any[]){
        let twoDArrayServiceForMap = new TwoDArrayService(mapToTraverse)

        let endIndexString = `${mapToTraverse[0].length-1},${mapToTraverse.length-1}`;

        let finished = false;
        let visitedIndexes: Set<string> = new Set();

        let distanceFromASource : Map<string, number> = new Map();
        distanceFromASource.set('0,0', 0);
        
        while (!finished) {
            //determine what index we're exploring from & get the current path distance
            let currentIndexString = distanceFromASource.keys().next().value;
            let currentIndex = [parseInt(currentIndexString.split(',')[0]), parseInt(currentIndexString.split(',')[1])]
            let currentPathDistance: any[] = distanceFromASource.values().next().value;
            
            //get adjacent indexes (no diagonals) for exploration
            let adjacentIndexes = twoDArrayServiceForMap.getAdjacentIndices(currentIndex, false);
            adjacentIndexes.forEach(adjacentIndex => {
                let adjacentIndexAsString = `${adjacentIndex[0]},${adjacentIndex[1]}`;

                //only explore if the adjacent index is valid AND hasn't been visited
                if(twoDArrayServiceForMap.isValidIndex(adjacentIndex) && !visitedIndexes.has(adjacentIndexAsString)){
                    //calculate potential new distance for exploration of adjacent index
                    let distanceForAdjacentIndex = mapToTraverse[adjacentIndex[1]][adjacentIndex[0]];
                    let newDistanceFromSourceForAdjacentIndex = currentPathDistance + distanceForAdjacentIndex;

                    //get current distance for the adjacent index, if there isn't one then this will return a large number
                    let currentDistanceFromSourceForAdjacentIndex = this.getCurrentDistance(distanceFromASource, adjacentIndexAsString);
                    //if the calculated distance is smaller than the current distance, replace it
                    if(newDistanceFromSourceForAdjacentIndex < currentDistanceFromSourceForAdjacentIndex){
                        distanceFromASource.set(adjacentIndexAsString, newDistanceFromSourceForAdjacentIndex);
                    }
                }
            })

            //sort the distance map so the first one is the smallest
            distanceFromASource = new Map([...distanceFromASource.entries()].sort((a,b) => a[1]-b[1]));
            //mark the current index as explored - this means we have already found the smallest distance to that index
            visitedIndexes.add(currentIndexString);
            
            //we're done when the current index is the goal index
            if(currentIndexString === endIndexString){
                finished = true;
            } else {
                //delete the current index from the distance map, 
                //now that we've already found the smallest distance and marked it as visited, we no longer need to track the distance
                //NOTE: this step is skipped if we're at the end so that we have easy access to the distance after the while closes.
                distanceFromASource.delete(currentIndexString)
            }   
        }

        return this.getCurrentDistance(distanceFromASource, endIndexString);
    }

    private getCurrentDistance(distanceMap: Map<string, number>, indexString: string){
        let valueForKey = distanceMap.get(indexString);
        let curNumForKey: number = valueForKey !== undefined?valueForKey:Number.MAX_SAFE_INTEGER;
        return curNumForKey;
    }
}