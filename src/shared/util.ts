export class Util {
    static checkAnswer(solution: number, correctAnswer: number): boolean {
        let correct = solution === correctAnswer;
        if (correct) {
            console.log('CORRECT');
        } else {
            console.log('TRY AGAIN');
        }

        return correct;
    }

    static convertStringArrayToNumberArray(stringArray: string[]){
        let numArray: number[] = [];
        stringArray.forEach((datum) => {
            numArray.push(parseInt(datum));
        })
        return numArray;
    }
}