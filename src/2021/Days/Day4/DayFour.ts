import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface";
import { BingoCard } from "./BingoCard.js";
import { BingoDataReader } from "./BingoDataReader.js";

export class DayFour extends Day implements DayInterface  {
    dayName = 'Day Four'
    bingoDataReader = new BingoDataReader(this.dataReader);
    
    bingoCalls:number[] = [];
    bingoCards:BingoCard[] = [];

    private callBingoUntilNumCardsWin(stopAfterNumCardsWin: number) {
        let callIndex = 0;
        let numCardsThatHaveWon = 0;

        let cardToReturn: BingoCard = new BingoCard([], -1)

        while (callIndex < this.bingoCalls.length && numCardsThatHaveWon !== stopAfterNumCardsWin) {
            let call = this.bingoCalls[callIndex];
            this.bingoCards.forEach(card => {
                if(card.bingoCall < 0){
                    let markedLocation = card.markNumber(call);
                    if(callIndex > 3 && markedLocation.length === 2) {
                        if(card.checkForBingo(markedLocation)){
                            numCardsThatHaveWon ++;
                            card.bingoCall = call;
                            cardToReturn = card;
                        };
                    }
                }
            })
            callIndex ++;
        }

        return cardToReturn;
    }


    partOne(): boolean{
        this.prepareDataForPuzzle();
        let winningCard: BingoCard = this.callBingoUntilNumCardsWin(1);

        let winningCardScore = winningCard.calculateScore();
        let solution = winningCard.bingoCall * winningCardScore;
        
        console.log(`winning call: ${winningCard.bingoCall}, card score: ${winningCardScore}, mult: ${solution}`);
        return Util.checkAnswer(solution, 25023);

    }

    partTwo(): boolean{
        this.prepareDataForPuzzle();
        let losingCard: BingoCard = this.callBingoUntilNumCardsWin(this.bingoCards.length);

        let losingCardScore = losingCard.calculateScore();
        let solution = losingCard.bingoCall * losingCardScore;
        
        console.log(`winning call: ${losingCard.bingoCall}, card score: ${losingCardScore}, mult: ${solution}`);
        return Util.checkAnswer(solution, 2634);
    }

    prepareDataForPuzzle(): void {
        if (this.bingoCalls.length === 0 || this.bingoCards.length === 0){
            let fileName = "src/2021/inputFiles/dayFourInput.txt";
            this.bingoCards = this.bingoDataReader.readBingoCards(fileName);
            this.bingoCalls = this.bingoDataReader.readBingoCalls(fileName);
        } else {
            this.bingoCards.forEach(card=>card.resetMarks())
        }
    }
    
}