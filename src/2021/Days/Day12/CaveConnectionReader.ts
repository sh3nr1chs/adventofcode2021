import { DataReader } from "../../../shared/dataReader.js";
import { SpecializedDataReader } from "../../../shared/SpecializedDataReader.js";

export class CaveConnectionReader extends SpecializedDataReader {
    readCaveConnections(fileName: string){
        let caveSystem = new Map<string, Set<string>>();
        let connections: string[] = this.dataReader.convertFileToStringArray(fileName);
        
        connections.forEach(connection => {
            let caves = connection.split('-');
            this.writeCaves(caves[0], caves[1], caveSystem)     
            this.writeCaves(caves[1], caves[0], caveSystem)          
        })
        return caveSystem;
    }

    private writeCaves(srcCave: string, destCave: string, caveSystem:Map<string, Set<string>>) {
        if(destCave !== 'start' && srcCave !== 'end'){
            if (!caveSystem.has(srcCave)){
                caveSystem.set(srcCave, new Set<string>())
            }
            let caveSet = caveSystem.get(srcCave);
            caveSet?.add(destCave)
        }
    }
}