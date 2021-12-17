import { Packet } from "./Packet.js";

export class LiteralPacket extends Packet {
    literalValue: number;
    constructor(version:number, literalValue:number){
        super(version, 4);
        this.literalValue = literalValue;
    }
}