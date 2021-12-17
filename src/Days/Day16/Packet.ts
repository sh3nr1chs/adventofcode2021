export class Packet {
    version: number;
    packetTypeId:number;
    numBits = 0;
    constructor(version:number, packetTypeId:number){
        this.version = version;
        this.packetTypeId = packetTypeId;
    }
}