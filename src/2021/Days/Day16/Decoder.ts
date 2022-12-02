import { LiteralPacket } from "./LiteralPacket.js";
import { OperatorPacket } from "./OperatorPacket.js";
import { Packet } from "./Packet.js";

export class Decoder {
    hexString:string;
    binString = '';
    constructor(hexString:string) {
        this.hexString = hexString;
    }

    private convertHexToBinary() {
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

    private getLiteralBinStringSegment(packet:Packet){
        let literalBinString = '';

        let numBitsInSegment = 0;
        let finishedReadingLiteral = false;
        while (!finishedReadingLiteral){
            //get five characters
            let groupBin = this.binString.substring(0,5);
            numBitsInSegment += 5;
            this.binString = this.binString.substring(5);
            //check the indicator for whether this is the last group
            finishedReadingLiteral = groupBin.slice(0,1) === '0';
            literalBinString = literalBinString.concat(groupBin.substring(1))
        }

        packet.numBits += numBitsInSegment;

        return literalBinString;
    }

    private getSegment(numBitsInSegment:number, packet:Packet) {
        let binSegment = this.binString.substring(0, numBitsInSegment);
        this.binString = this.binString.substring(numBitsInSegment);
        packet.numBits += numBitsInSegment;
        return binSegment;
    }

    getPacketStructure(): any {
        this.binString = this.convertHexToBinary();
        let topLevelPacket;

        let operatorPackets:OperatorPacket[] = []

        //either exhaust the binary string or stop when all that's left is 0s
        while(typeof(parseInt(this.binString)) === 'number' && parseInt(this.binString) > 0) {
            let currentOPacket = operatorPackets[operatorPackets.length - 1]

            let packet = new Packet();

            let versionBin = this.getSegment(3, packet);
            let version = parseInt(versionBin, 2);
            packet.version = version;

            let packetIdTypeBin = this.getSegment(3, packet);
            let packetIdType = parseInt(packetIdTypeBin, 2);
            packet.packetTypeId = packetIdType;

            if(packetIdType === 4){
                let literalPacket = new LiteralPacket(packet);
                //literal value
                let literalBinValue = this.getLiteralBinStringSegment(literalPacket);
                let literalValue = parseInt(literalBinValue, 2);
                literalPacket.literalValue = literalValue;

                if(!topLevelPacket){
                    topLevelPacket = literalPacket;
                    this.binString = '00';
                } else {
                    currentOPacket.packets.push(literalPacket);
                }

            } else {
                let operatorPacket = new OperatorPacket(packet);
                
                //check the length type id
                let lengthTypeIdBit = this.getSegment(1, operatorPacket);
                if (lengthTypeIdBit === '0') {
                    let numBitsContainedBin = this.getSegment(15, operatorPacket);
                    operatorPacket.numBitsForSubPackets = parseInt(numBitsContainedBin, 2);
                } else {
                    let numPacketsContainedBin = this.getSegment(11, operatorPacket);
                    operatorPacket.numSubPackets = parseInt(numPacketsContainedBin, 2);
                }

                operatorPackets.push(operatorPacket);
                if(!topLevelPacket){
                    topLevelPacket = operatorPacket;
                } else {
                    currentOPacket.packets.push(operatorPacket);
                }
            }

            //remove completed operator packets
            operatorPackets = operatorPackets.filter(oPacket => {
                let numSubPackets = this.getTotalSubPackets(oPacket);
                let numBitsInSubPackets = this.getNumBitsInSubPacket(oPacket);
                if(oPacket.numSubPackets !== -1 && oPacket.numSubPackets === numSubPackets){
                    return false;
                }
                if(oPacket.numBitsForSubPackets !== -1 && oPacket.numBitsForSubPackets === numBitsInSubPackets){
                    return false;
                }

                return true;
            })
        }
        return topLevelPacket;
    }

    private getTotalSubPackets(packet: OperatorPacket){
        return(packet.packets.length)
    }

    private getNumBitsInSubPacket(packet: Packet){
        let childPackets = this.getChildPackets(packet);
        let totalBits = childPackets.reduce((prev, curr) => {
            return {numBits:prev.numBits+curr.numBits}
        }, {numBits:0});

        return totalBits.numBits;
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

    evaluateExpression(topLevelPacket: Packet){
        let value = 0;
        
        //get all the children values for the top level packet
        let childValues : number[] = [];
        if (topLevelPacket instanceof OperatorPacket) {            
            (topLevelPacket as OperatorPacket).packets.forEach((child: Packet) => {
                childValues.push(this.evaluateExpression(child));
            })
        }
            
        let packetIdType = topLevelPacket.packetTypeId;
        //for comparison packet types, there should only be two sub packets
        if ((packetIdType === 5 || packetIdType === 6 || packetIdType === 7) && childValues.length !==2){
            throw Error(`wrong number of subpackets, expected 2 but got ${childValues.length}`)
        }

        //evaluate the expression based on the packet id type
        switch(packetIdType) {
            case 0:
                value = childValues.reduce((prev, curr) => prev + curr);
                break;
            case 1:
                value = childValues.reduce((prev, curr) => prev * curr);
                break;
            case 2:
                value = Math.min(...childValues);
                break;
            case 3:
                value = Math.max(...childValues);
                break;
            case 5:
                value = childValues[0] > childValues[1]?1:0;
                break;
            case 6:
                value = childValues[0] < childValues[1]?1:0;
                break;
            case 7:
                value = childValues[0] === childValues[1]?1:0;
                break;
            default:
                value = (topLevelPacket as LiteralPacket).literalValue;
        }
    
        return value;
    }
    
}