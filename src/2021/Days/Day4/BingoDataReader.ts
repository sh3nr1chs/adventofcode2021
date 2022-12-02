import { DataReader } from "../../../shared/dataReader.js";
import { SpecializedDataReader } from "../../../shared/SpecializedDataReader.js";
import { Util } from "../../../shared/util.js";
import { BingoCard } from "./BingoCard.js";

export class BingoDataReader extends SpecializedDataReader{
  
    constructor(dataReader: DataReader){
         super(dataReader);
    }

    readBingoCalls(fileName: string): number[] {
        let textByLine = this.dataReader.convertFileToStringArray(fileName);
        let callString = textByLine[0];
        let calls = callString.split(",");

        return Util.convertStringArrayToNumberArray(calls);
    }

    readBingoCards(fileName: string): BingoCard[] {
        let bingoCards: BingoCard[] = [];
        let textByLine = this.dataReader.convertFileToStringArray(fileName);
        let cardNumber = 1;
        //cards start on line three, with a blank line in between
        for(let i = 2; i < textByLine.length;) {
            let cardData: any[] = [];
            let finalIndexForCard = i + 5;
            while (i < finalIndexForCard){
                let numberString = textByLine[i].match(/.{1,3}/g);
                let cardValues: number[] = [];
                numberString?.forEach(number => {
                    cardValues.push(parseInt(number));
                })
                cardData.push(cardValues);
                i++
            }

            let bingoCard = new BingoCard(cardData, cardNumber);
            bingoCards.push(bingoCard);
            cardNumber ++;
            i++
        }
        
        return bingoCards;
    }
}