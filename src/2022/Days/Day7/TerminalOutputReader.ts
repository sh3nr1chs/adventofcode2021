import { Dir } from "fs";
import { text } from "stream/consumers";
import { DataReader } from "../../../shared/dataReader.js";
import { SpecializedDataReader } from "../../../shared/SpecializedDataReader.js";
import { DirectoryNode } from "./DirectoryNode.js";

export class TerminalOutputReader extends SpecializedDataReader {

    constructor(dataReader: DataReader){
        super(dataReader);
    }

    getDirectory(fileName:string){
        let textByLine = this.dataReader.convertFileToStringArray(fileName);
        
        let rootNode = new DirectoryNode("/");
        rootNode.isDir = true;
          
        let currentNode: DirectoryNode | undefined = rootNode;
        textByLine.forEach(line=>{
            if(this.shouldNavToDirectory(line.split(" ")[2])) {
                if (line.split(" ")[2] === '/'){
                    currentNode = rootNode;
                } else {
                    currentNode = currentNode?.children.find(node=>{
                        return node.name === line.split(" ")[2]
                    })
                }
            } else if (this.shouldListDirectory(line.split(" ")[1])) {

            } else if (this.shouldMoveOutOneLevel(line.split(" ")[2])){
                currentNode = currentNode?.parent;
            } else {
                currentNode?.addChild(line.split(" ")[1], parseInt(line.split(" ")[0]), currentNode)
            }
        })

        return rootNode;
    }

    shouldNavToDirectory(newNode:string){
        return newNode != '..' && newNode != undefined;
    }

    shouldListDirectory(command:string){
        return command==='ls';
    }

    shouldMoveOutOneLevel(command:string){
        return command==='..';
    }
}