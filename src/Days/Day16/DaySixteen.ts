import { Util } from "../../shared/util.js";
import { Day } from "../Day.js";
import { DayInterface } from "../DayInterface.js";
import { Decoder } from "./Decoder.js";
import { OperatorPacket } from "./OperatorPacket.js";
import { Packet } from "./Packet.js";

export class DaySixteen extends Day implements DayInterface {
    dayName: string = "Day Sixteen";

    hexString: string ='';

    partOne(): boolean {
        this.prepareDataForPuzzle();
        let decoder = new Decoder(this.hexString);
        let topLevelPacket = decoder.getPacketStructure();

        let versionTotal = this.totalVersion(topLevelPacket, decoder);

        console.log(`Total Version For All Packets: ${versionTotal}`);

        return Util.checkAnswer(versionTotal, 984);
    }

    partTwo(): boolean {
        this.prepareDataForPuzzle();
        let decoder = new Decoder(this.hexString);
        let topLevelPacket = decoder.getPacketStructure();

        let expressionValue = decoder.evaluateExpression(topLevelPacket);

        console.log(`Value of the expression: ${expressionValue}`);

        return false;
    }

    private totalVersion(topLevelPacket: Packet, decoder:Decoder){
        let totalVersion = topLevelPacket.version;
        decoder.getChildPackets(topLevelPacket).forEach(childPacket => {
            totalVersion += childPacket.version;
        })

        return totalVersion;
    }

    prepareDataForPuzzle() {
        if(this.hexString === ''){
            this.hexString = this.dataReader.convertFileToStringArray("inputFiles/testInput.txt")[0]
        }
    }

}