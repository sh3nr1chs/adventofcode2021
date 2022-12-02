import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface";
import { Decoder } from "./Decoder.js";
import { Packet } from "./Packet.js";

export class DaySixteen extends Day implements DayInterface {
    dayName: string = "Day Sixteen";

    hexString: string ='';

    decoder: Decoder = new Decoder('');

    partOne(): boolean {
        this.prepareDataForPuzzle();
        let topLevelPacket = this.decoder.getPacketStructure();

        let versionTotal = this.calculateTotalVersion(topLevelPacket);
        console.log(`Total Version For All Packets: ${versionTotal}`);

        return Util.checkAnswer(versionTotal, 984);
    }

    private calculateTotalVersion(topLevelPacket: Packet){
        let totalVersion = topLevelPacket.version;
        this.decoder.getChildPackets(topLevelPacket).forEach(childPacket => {
            totalVersion += childPacket.version;
        })

        return totalVersion;
    }

    partTwo(): boolean {
        this.prepareDataForPuzzle();
        let topLevelPacket = this.decoder.getPacketStructure();

        let expressionValue = this.decoder.evaluateExpression(topLevelPacket);
        console.log(`Value of the expression: ${expressionValue}`);

        return Util.checkAnswer(expressionValue, 1015320896946);
    }

    prepareDataForPuzzle() {
        if(this.hexString === ''){
            this.hexString = this.dataReader.convertFileToStringArray("src/2021/inputFiles/daySixteenInput.txt")[0]
            this.decoder = new Decoder(this.hexString);
        }
    }

}