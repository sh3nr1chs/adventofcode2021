import { Packet } from "./Packet.js";

export class OperatorPacket extends Packet {
    packets: Packet[] = [];

    numBitsForSubPackets = -1;
    numSubPackets = -1;

    constructor(packet:Packet){
        super();
        this.version = packet.version;
        this.packetTypeId = packet.packetTypeId;
        this.numBits = packet.numBits;
    }
}