export class PairAssignment {
    pairOne: number[];
    pairTwo: number[];

    constructor(assignment:string) {
        let pairOneString: string = assignment.split(",")[0];
        let pairTwoString: string = assignment.split(",")[1];

        this.pairOne = [parseInt(pairOneString.split("-")[0]), parseInt(pairOneString.split("-")[1])];
        this.pairTwo = [parseInt(pairTwoString.split("-")[0]), parseInt(pairTwoString.split("-")[1])]; 
    }
}