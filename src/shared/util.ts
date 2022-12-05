export class Util {
    static checkAnswer(solution: any, correctAnswer: any): boolean {
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

    static indexIsAlreadyInList(list: any[], index: number[]) {
        let isInlist = false;
        list.forEach(item => {
            if (item[0] === index[0] && item[1] === index[1]){
                isInlist = true;
            }
        })

        return isInlist;
    }
}