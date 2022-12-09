import { serialize } from "v8";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";
import { Util } from "../../../shared/util.js";
import { DirectoryNode } from "./DirectoryNode.js";
import { TerminalOutputReader } from "./TerminalOutputReader.js";

export class DaySeven extends Day implements DayInterface {
    dayName: string = '2022 Day Seven';

    terminalOutputReader = new TerminalOutputReader(this.dataReader);
    root!: DirectoryNode;

    smallDirectories: DirectoryNode[] = [];
    possibleDeletes: DirectoryNode[] = [];


    partOne() {
        this.prepareDataForPuzzle();
        this.traverse(this.root);

        let totalSizeForSmallDirectories = 0;
        this.smallDirectories.forEach(smol => totalSizeForSmallDirectories += smol.size)
        console.log(`The total size of all directories < 100000 is ${totalSizeForSmallDirectories}.`);
     
        return Util.checkAnswer(totalSizeForSmallDirectories, 2031851);
    }

    partTwo() {
        this.prepareDataForPuzzle();
        
        let totalCurrentlyAvailable = 70000000 - this.root.size;
        let needAtLeast = 30000000 - totalCurrentlyAvailable;
        this.traverse(this.root, needAtLeast);
        this.possibleDeletes.sort((a,b) => a.size - b.size);
     
        console.log(`Delete ${this.possibleDeletes[0].name} to free up ${this.possibleDeletes[0].size}.`);
     
        return Util.checkAnswer(this.possibleDeletes[0].size, 2568781);
    }
   
    prepareDataForPuzzle() {
        this.possibleDeletes = [];
        this.smallDirectories = [];
        this.root = this.terminalOutputReader.getDirectory("src/2022/inputFiles/DaySevenInput.txt");
        this.setTotalSizesForDirectories(this.root);
    }

    traverse(node: DirectoryNode, mustBeAtLeast:number = 0) {
        if(!node.isDir){
            //a file
            return;
        } else {
            //a directory
            if(node.size < 100000) {
                this.smallDirectories.push(node);
            }
            if(node.size > mustBeAtLeast) {
                this.possibleDeletes.push(node);
            }
            node.children.forEach(child=> this.traverse(child, mustBeAtLeast))
        }
    }

    setTotalSizesForDirectories(node: DirectoryNode){
        let total = 0;
        if(node.children.length === 0) {
            total = node.size;
        } else {
            node.children.forEach(child => {
                let value = this.setTotalSizesForDirectories(child)
                total += value;
                child.parent.size += value;
            })
        }
       return total;
    }

}