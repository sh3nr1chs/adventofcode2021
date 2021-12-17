import { Packet } from "./Packet.js";

export class OperatorPacket extends Packet {
   

    packets: Packet[] = [];

    numBitsForSubPackets = -1;
    numSubPackets = -1;

    constructor(version:number, packetTypeId: number){
        super(version, packetTypeId);
    }
}