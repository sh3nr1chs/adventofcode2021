import { SIGXCPU } from "constants";

export class Display {
    observedDigits: string[];
    output: string[];

    identifiedDigits: string[] = [];

    constructor(observedDigits:string[], output:string[]) {
        this.observedDigits = observedDigits;
        this.output = output;
    }

    identifyOutput(): number{
        this.identifyDigits();
   
        let stringDigitsOutput = ''
        this.output.forEach((outputDigit: string) => {
            stringDigitsOutput = stringDigitsOutput.concat(this.identifiedDigits.indexOf(outputDigit).toString())
        })

        return parseInt(stringDigitsOutput)
    }

    private getNumMatchBetweenDigitAndIdentifiedDigit(digit:string, identifiedDigit:string) {
        return identifiedDigit.split('').filter((segment:string) => digit.indexOf(segment) >= 0).length;
    }

    private identifyDigits() {

        //identify the one, four, seven & eight since we can get those just by using their unique segment length
        this.identifiedDigits[1] = this.observedDigits.filter(digit => digit.length === 2)[0];
        this.identifiedDigits[4] = this.observedDigits.filter(digit => digit.length === 4)[0];
        this.identifiedDigits[7] = this.observedDigits.filter(digit => digit.length === 3)[0];
        this.identifiedDigits[8] = this.observedDigits.filter(digit => digit.length === 7)[0];

        // twos, threes, and fives use the same number of segments
        let twoThreeOrFive = this.observedDigits.filter(digit => digit.length === 5);
        twoThreeOrFive.forEach(digit =>{
            //threes are the only one to contain all of the segements in a one
            if(this.getNumMatchBetweenDigitAndIdentifiedDigit(digit, this.identifiedDigits[1]) === 2){
                this.identifiedDigits[3] = digit;
            //fives match 3/4 segments from the four (while the two matches only 2 segments)
            } else if (this.getNumMatchBetweenDigitAndIdentifiedDigit(digit, this.identifiedDigits[4]) === 3) {
                this.identifiedDigits[5] = digit;
            //two is what's left
            } else {
                this.identifiedDigits[2] = digit;
            }
        })
    
        // zeros, sixes, and nines use the same number of segments
        let zeroSixOrNine = this.observedDigits.filter(digit => digit.length === 6);
        zeroSixOrNine.forEach(digit =>{
            //sixes are the only one missing a segment from the one
            if(this.getNumMatchBetweenDigitAndIdentifiedDigit(digit, this.identifiedDigits[1]) === 1){
                this.identifiedDigits[6] = digit;
            //nines contain 4/4 segments of a four (while the zero contains only 3)
            } else if (this.getNumMatchBetweenDigitAndIdentifiedDigit(digit, this.identifiedDigits[4]) === 4) {
                this.identifiedDigits[9] = digit;
            } else {
            //zero is what's left
                this.identifiedDigits[0] = digit;
            }
        })
    }

    reset() {
        this.identifiedDigits = [];
    }

    writeIdentifiedDigits() {
        console.log('~~IDENTIFIED DIGITS~~')
        this.identifiedDigits.forEach((digit, index) => {
            console.log(`${index} : ${digit}`)
        })
    }

    toString(){
        this.writeIdentifiedDigits();
        return `Observed Digits: ${this.observedDigits} | Output: ${this.output}`
    }
}