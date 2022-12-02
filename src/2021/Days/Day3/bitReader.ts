import { read } from "fs";

export class BitReader{

    determineCommonBitForEachPlace(readings: string[], mostOrLeast: string){
        let commonBits: string = '';

        let charCount = this.countBits(readings);
        charCount.forEach(char =>{
            let appendZero = false;
            switch (mostOrLeast) {
                case 'most':
                    appendZero = this.isZeroTheMorePopularBit(char[0], char[1])
                    break;
                case 'least':
                    appendZero = !this.isZeroTheMorePopularBit(char[0], char[1]);
                    break;
            }

            if (appendZero) {
                commonBits = commonBits + '0';
            } else {
                commonBits = commonBits + '1';
            }
         })

         return commonBits;
    }

    filterReadings(readings: string[], defaultFilter: number, mostOrLeast: string) : string {
        let readingFound = false;
        let filteredReading: string = 'Not found';

        let charIndex = 0;
        let numCharsInReading = readings[0].length;
        while (charIndex < numCharsInReading && !readingFound){
            let filterChar =  this.determineFilterChar(defaultFilter, readings, mostOrLeast, charIndex);
            readings = readings.filter((reading) => parseInt(reading[charIndex]) === filterChar)

            if (readings.length === 1) {
                readingFound = true;
                filteredReading = readings[0];
            }

            charIndex ++;
        }

        if (!readingFound) {
            console.log("Unable to find reading.")
        }

        return filteredReading;
    }

    convertBitsToDecimal(binary: string) {
        return parseInt(binary, 2);
    }

    private countBits(readings: string[]){
        let charCount: any[] = [];

        readings.forEach(reading => {
            let bits = reading.split("");
            bits.forEach((bit, index) => {
                if (charCount[index] === undefined) {
                    charCount[index] = [0, 0];
                }
                if (bit === '0') {
                    charCount[index][0] += 1 ;
                } else {
                    charCount[index][1] += 1; 
                }
            })
        });

        return charCount;
    }

    private isZeroTheMorePopularBit(zeroCount: number, oneCount: number){
        return zeroCount > oneCount
    }

    private determineFilterChar(defaultFilter: number, readings: string[], mostOrLeast: string, tryCount:number){
        let filterChar: number;
        let charCount = this.countBits(readings)
        let char = charCount[tryCount];
        
        let setFilterToZero = false;
        switch(mostOrLeast) {
            case "most":
                setFilterToZero = this.isZeroTheMorePopularBit(char[0], char[1]);
                break;  
            case "least":
                setFilterToZero = !this.isZeroTheMorePopularBit(char[0], char[1]);
                break;
        }
        
        if (char[0] === char[1]) {
            filterChar = defaultFilter;
        } else if (setFilterToZero) {
            filterChar = 0;
        } else {
            filterChar = 1;
        }

        return filterChar
    }

}