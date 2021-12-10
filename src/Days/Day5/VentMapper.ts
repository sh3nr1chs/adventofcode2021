import { VentCoordinates } from "./VentCoordinates.js";

export class VentMapper {

    ventMapRows: any[] = [[0]];

    resetMap(){
        this.ventMapRows = [[0]];
    }

    mapVents(vents: VentCoordinates[]){
        vents.forEach(vent => {
            this.updateMapSize(vent)       
            this.mapLine(vent);
        })
    }

    countDangerZones() {
        let numDangerZones = 0;
        this.ventMapRows.forEach(row => {
            row.forEach((location:number) => {
                if(location >= 2){
                    numDangerZones ++;
                }
            })
        })

        return numDangerZones;
    }

    private mapLine(vent: VentCoordinates) {
        let leftRightStraight = this.decideHorizontalDirection(vent);
        let upDownStraight = this.decideVerticalDirection(vent);

        let coord = vent.start;
        let done = false;
        while(!done) {
            if(coord[0] === vent.end[0] && coord[1] === vent.end[1]){
                done = true;
            }
            let row = this.ventMapRows[coord[1]];
            row[coord[0]]++;

            //move horizontal
            if(leftRightStraight === "right"){
                coord[0]++
            } else if (leftRightStraight === "left"){
                coord[0]--
            }

            //move vertical
            if(upDownStraight === "up"){
                coord[1]++;
            } else if(upDownStraight === "down"){
                coord[1]--;
            }
        }
    }

    private decideHorizontalDirection(vent: VentCoordinates) {
        let leftRightStraight = "straight";
        if(vent.start[0] < vent.end[0]){
            leftRightStraight = "right";
        } else if (vent.start[0] > vent.end[0]) {
            leftRightStraight = "left";
        }

        return leftRightStraight;
    }

    private decideVerticalDirection(vent: VentCoordinates) {
        let upDownStraight = "straight";
        if(vent.start[1] < vent.end[1]) {
            upDownStraight = "up";
        } else if (vent.start[1] > vent.end[1]) {
            upDownStraight = "down";
        }

        return upDownStraight;
    }

    private updateMapSize(vent: VentCoordinates) {
        let maxX = vent.start[0] > vent.end[0]? vent.start[0]:vent.end[0]  
        let maxY = vent.start[1] > vent.end[1]? vent.start[1]:vent.end[1] 

        let maxRowLength = 1; 
        //add columns
        this.ventMapRows.forEach(row => {
            while (row.length-1 < maxX) {
                row.push(0)
            }
        })
        if (maxX > maxRowLength) {
            maxRowLength = maxX;
        }

        //add rows
        while (this.ventMapRows.length-1 < maxY) {
            this.ventMapRows.push(this.createEmptyRow(maxRowLength))
        }
    }

    private createEmptyRow(rowLength: number){
        let row = [];
        while(row.length < rowLength + 1){
            row.push(0);
        }
        return row;
    }

    private printMap() {
        console.log(`START MAP`);
        this.ventMapRows.forEach(row => {
            let rowString = '';
            row.forEach((value: string) => {
                rowString = rowString + ' ' + value;
            })
            console.log(rowString);
        })
        console.log(`END MAP`);
    }
}