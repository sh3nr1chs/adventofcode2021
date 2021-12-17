import { parse } from "path/posix";
import { LiteralPacket } from "./LiteralPacket.js";
import { OperatorPacket } from "./OperatorPacket.js";
import { Packet } from "./Packet.js";

export class Decoder {
    hexString:string;
    binString = '';
    constructor(hexString:string) {
        this.hexString = hexString;
    }
    convertHexToBinary() {
        var binaryOut = "";
        for(var char of this.hexString.toLowerCase()) {
            switch(char) {
                case '0': binaryOut += "0000"; break;
                case '1': binaryOut += "0001"; break;
                case '2': binaryOut += "0010"; break;
                case '3': binaryOut += "0011"; break;
                case '4': binaryOut += "0100"; break;
                case '5': binaryOut += "0101"; break;
                case '6': binaryOut += "0110"; break;
                case '7': binaryOut += "0111"; break;
                case '8': binaryOut += "1000"; break;
                case '9': binaryOut += "1001"; break;
                case 'a': binaryOut += "1010"; break;
                case 'b': binaryOut += "1011"; break;
                case 'c': binaryOut += "1100"; break;
                case 'd': binaryOut += "1101"; break;
                case 'e': binaryOut += "1110"; break;
                case 'f': binaryOut += "1111"; break;
                default: return "";
            }
        }

        return binaryOut;
    }

    getVersionNumber(binaryString:string){
        let binVersion = binaryString.substring(0,3);
        console.log(`bin version: ${binVersion}`)
        return parseInt(binVersion, 2);
    }

    getPacketTypeId(binaryString: string){
        let binPacketTypeId = binaryString.substring(3,6);
        console.log(`bin packet type: ${binPacketTypeId}`)
        return parseInt(binPacketTypeId, 2);
    }

    getLiteralValue(){
        let finishedReadingLiteral = false;
        //header is the first six characters
    
        let literalBinString = '';
        while (!finishedReadingLiteral){
            let groupBin = this.binString.substring(0,5);
            console.log(`groupBin : ${groupBin}`)
            let indicator = groupBin.slice(0,1);
            finishedReadingLiteral = indicator === '0';
            literalBinString = literalBinString.concat(groupBin.substring(1))
            this.binString = this.binString.substring(5);
           

        }
        console.log(literalBinString)
        return literalBinString;

    }

    private getOneBit(){
        let bin = this.binString.substring(0,1);
        this.binString = this.binString.substring(1);
        return bin;
    }

    private getThreeBits(){
        let bin = this.binString.substring(0,3);
        this.binString = this.binString.substring(3);
        return bin;
    }

    private getNumBits(numBits:number){
        let bin = this.binString.substring(0,numBits);
        this.binString = this.binString.substring(numBits);
        return bin;
    }

    getPacketStructure(): any {
        let topLevelPacket;
        this.binString = this.convertHexToBinary();

        let operatorPackets:OperatorPacket[] = []
        let currentOperatorPacketIndex = -1;
        let isFirstOPacket = true;

        let finished = false;
        while(typeof(parseInt(this.binString)) === 'number' && parseInt(this.binString) > 0) {
            currentOperatorPacketIndex = operatorPackets.length - 1;
            let numBitsInPacket = 0; 
            let versionBin = this.getThreeBits();
            
                numBitsInPacket += 3;
            

            let version = parseInt(versionBin, 2);

            let packetIdTypeBin = this.getThreeBits();
            numBitsInPacket += 3;
            
            let packetIdType = parseInt(packetIdTypeBin, 2);
            if(packetIdType === 4){
                //literal value
                let literalBinValue = this.getLiteralValue();
               
                    numBitsInPacket +=(literalBinValue.length + literalBinValue.length/4)
                
                let literalValue = parseInt(literalBinValue, 2);
                let literalPacket = new LiteralPacket(version, literalValue);
                literalPacket.numBits = numBitsInPacket;
                if(operatorPackets.length === 0){
                    topLevelPacket = literalPacket;
                    finished = true;
                } else {
                    operatorPackets[currentOperatorPacketIndex].packets.push(literalPacket);
                }
            } else {
                let operatorPacket = new OperatorPacket(version, packetIdType);
                if(currentOperatorPacketIndex !== -1){
                    operatorPackets[currentOperatorPacketIndex].packets.push(operatorPacket)
                }
                
                //check the length type id
                let lengthTypeId = this.getOneBit();
                numBitsInPacket ++;
                if (lengthTypeId === '0') {
                    let numBitsContainedBin = this.getNumBits(15);
                    numBitsInPacket += 15;
                    operatorPacket.numBitsForSubPackets = parseInt(numBitsContainedBin, 2);
                } else {
                    let numPacketsContainedBin = this.getNumBits(11);
                    numBitsInPacket += 11;
                    operatorPacket.numSubPackets = parseInt(numPacketsContainedBin, 2);
                }

                operatorPacket.numBits = numBitsInPacket;
                if(isFirstOPacket){
                    isFirstOPacket = false;
                    topLevelPacket = operatorPacket;
                }
                operatorPackets.push(operatorPacket);
                // currentOperatorPacketIndex++;
                
    
            }

            //update completed packets
            operatorPackets = operatorPackets.filter(oPacket => {
                if(oPacket.numSubPackets !== -1 && oPacket.numSubPackets === this.totalSubPackets(oPacket)){
                    return false;
                }
                if(oPacket.numBitsForSubPackets !== -1 && oPacket.numBitsForSubPackets === (this.totalBits(oPacket))){
                    return false;
                }

                return true;
            })

        }


        return topLevelPacket;
        // let packet = this.getPackets(binString);
        
    }

    private totalSubPackets(packet: Packet){
        return(this.getDirectChildPackets(packet).length)
    }

    private totalBits(packet: Packet){
        let childPackets = this.getDirectChildPackets(packet);
        let totalBits = 0;
        childPackets.forEach(child => {
            totalBits += child.numBits;
        })

        return totalBits;
    }

    getDirectChildPackets(packet: Packet) {
        let children = [];
        if((packet as any).packets !== undefined){
            children.push(...(packet as any).packets)
        }

        return children;
    }

    getChildPackets(packet: Packet, children: Packet[] = []): Packet[] {
        if((packet as any).packets !== undefined){
            let oPacket = (packet as OperatorPacket);
            children.push(...oPacket.packets)
            oPacket.packets.forEach((childPacket: Packet) => {
                children = this.getChildPackets(childPacket, children)
            })

            
            
        }

        return children;
    }

    evaluateExpression(topLevelPacket: Packet, value: number = 0){
        if((topLevelPacket as any).packets !== undefined) {
            let oPacket = topLevelPacket as OperatorPacket;
            if(oPacket.packetTypeId === 0){
                oPacket.packets.forEach((child: Packet) => {
                    value += this.evaluateExpression(child);
                })
            }
        } else {
            value = (topLevelPacket as LiteralPacket).literalValue;
        }

        return value;

      
    }
    
}