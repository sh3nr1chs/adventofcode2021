export class VentCoordinates {
    start: number[] = []
    end: number[] = []

    constructor(startString:string, endString:string){
        let startStringArray = startString.split(',');
        startStringArray.forEach(value => {
            this.start.push(parseInt(value))
        })
        
        let endStringArray = endString.split(',');
        endStringArray.forEach(value => {
            this.end.push(parseInt(value))
        })
    }
}