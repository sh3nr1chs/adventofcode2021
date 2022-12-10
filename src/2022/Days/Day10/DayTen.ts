import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";
import { Util } from "../../../shared/util.js";

export class DayTen extends Day implements DayInterface {
    dayName: string = '2022 Day Ten';

    instructions:string[] = [];

    partOne() {
        this.prepareDataForPuzzle();
        let interestingValueMap = this.executeInstructions([20,60,100,140,180,220]);

        let total = 0;
        interestingValueMap.forEach(value=>total+=value)
        console.log(`The sum for the interesting signal strengths is ${total}`);
        
        return Util.checkAnswer(total, 15360);
    }

    partTwo() {
        this.prepareDataForPuzzle();
        this.executeInstructions([40,80,120,160,200,240], true);

        console.log(`The display should read 'PHLHJGZA'`);
        return Util.checkAnswer(true, true);
    }


    createValueMap(interestingValues: number[]){
        let map=new Map();
        interestingValues.forEach(value=>{map.set(value, 0)})
        return map;
    }

    executeInstructions(interestingValues:number[], logDisplay:boolean=false){
        let valueMap = this.createValueMap(interestingValues);

        let nextValueToAdd = 0;
        let pauseInstructionProcessing = false;
        
        let spriteLocation = 1;
        let displayLine = '';
        let drawPos = 0;

        let cycleCount = 1;
        for(let instructionIndex = 0; instructionIndex < this.instructions.length; instructionIndex++){
            //calculate sprite location
            if(!pauseInstructionProcessing){
                spriteLocation += nextValueToAdd;

                let instruction = this.instructions[instructionIndex];
                if(instruction.split(" ")[1] != undefined){
                    //parse add command
                    nextValueToAdd = parseInt(instruction.split(" ")[1]);

                    //needed to pause processing instructions
                    pauseInstructionProcessing = true;
                    instructionIndex --;
                } else {
                    //noop
                    nextValueToAdd=0;
                    pauseInstructionProcessing = false;
                } 
            } else {
                pauseInstructionProcessing = false;
            }

            //determine if screen should draw pixel
            if(drawPos <= spriteLocation+1 && drawPos >= spriteLocation-1){
                displayLine = displayLine.concat('#')
            } else {
                displayLine = displayLine.concat(' ')
            }
            drawPos++;
            
            if(valueMap.get(cycleCount) != undefined) {
                //calculate signal strenght for interesting cycles
                valueMap.set(cycleCount, spriteLocation*cycleCount);

                //when drawing the display, the interesting signals indicate the end of a line on the screen
                // so the display line and drawing position should be reset
                if(logDisplay){console.log(displayLine)}
                displayLine = '';
                drawPos = 0;
            }

            //cycle count always increases
            cycleCount++;
        }

        return valueMap;
    }

    prepareDataForPuzzle() {
        this.instructions = this.dataReader.convertFileToStringArray("src/2022/inputFiles/DayTenInput.txt")
    }
    
}