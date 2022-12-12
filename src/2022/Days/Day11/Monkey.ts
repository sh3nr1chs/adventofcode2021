export class Monkey {
    currentItems : number[] = [];
    
    inspectCount = 0;
    inspect:Function = function(){};
    divideBy = 0;
    recalculateItem:Function = function(){};

    monkeyForTrue:number = -1;
    monkeyForFalse: number = -1;
    
    throw(item:number, monkeys: Monkey[]){
        let itemBeingThrown = this.recalculateItem(item);
    
        if (item % this.divideBy === 0) {  
            monkeys[this.monkeyForTrue].currentItems.push(itemBeingThrown);
        } else {
            monkeys[this.monkeyForFalse].currentItems.push(itemBeingThrown);
        }
    }
}
