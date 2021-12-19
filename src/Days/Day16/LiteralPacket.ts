import { Packet } from "./Packet.js";

export class LiteralPacket extends Packet {
    literalValue: number = -1;

    constructor(packet: Packet){
        super();
        this.version = packet.version;
        this.packetTypeId = 4;
        this.numBits = packet.numBits;
    }
}