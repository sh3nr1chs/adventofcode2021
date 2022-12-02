import { Util } from "../../../shared/util.js";
import { Day } from "../../../shared/Day.js";
import { DayInterface } from "../../../shared/DayInterface.js";

export class DayTwo extends Day implements DayInterface {
    
    dayName = '2022 Day Two'   
    
    rounds:string[] = [];

    movePoints: Map<myMove, number> = new Map();
    resultPoints: Map<result, number> = new Map();
    
    partOne() {
        this.prepareDataForPuzzle();

        let totalPoints = 0;
        this.rounds.forEach(round => {
            let opponentMove = round[0] as opponentMoves;
            let move: myMove = round[2] as myMove;
            let myMovePoints = this.getPoints(move, this.movePoints);
            let resultPoints = this.getResultingPoints(move, opponentMove);
            totalPoints += myMovePoints + resultPoints;
        })
        
        console.log(`Total score for following the guide incorrectly: ${totalPoints}`);
        return Util.checkAnswer(totalPoints, 11063);
    }

    partTwo() {
        this.prepareDataForPuzzle();

        let totalPoints = 0;
        this.rounds.forEach(round => {
            let opponentMove = round[0] as opponentMoves;
            let results: result = round[2] as result;
            let resultPoints = this.getPoints(results, this.resultPoints);
            let myMovePoints = this.getCorrectMovePoints(opponentMove, results);
            totalPoints += myMovePoints + resultPoints;
        })
        
        console.log(`Total score for following the guide correctly: ${totalPoints}`);
        return Util.checkAnswer(totalPoints, 10349);
    }

    private getPoints(value: myMove | result, pointsMap:Map<any,any>): number {
        let points = pointsMap.get(value);
        return points?points:0;
    }

    private getResultingPoints(move: myMove, opponentMove: opponentMoves): number{
        let points = 0;
        switch (move) {
            case myMove.PAPER :
                if (opponentMove === opponentMoves.ROCK) {
                    points = this.getPoints(result.WIN, this.resultPoints);
                } else if (opponentMove === opponentMoves.PAPER) {
                    points = this.getPoints(result.DRAW, this.resultPoints);;
                } else if (opponentMove === opponentMoves.SCISSORS) {
                    points = this.getPoints(result.LOSS, this.resultPoints);;
                }
                break;
            case myMove.ROCK :
                if (opponentMove === opponentMoves.ROCK) {
                    points = this.getPoints(result.DRAW, this.resultPoints);
                } else if (opponentMove === opponentMoves.PAPER) {
                    points = this.getPoints(result.LOSS, this.resultPoints);;
                } else if (opponentMove === opponentMoves.SCISSORS) {
                    points = this.getPoints(result.WIN, this.resultPoints);;
                }
                break;
            case myMove.SCISSORS :
                if (opponentMove === opponentMoves.ROCK) {
                    points = this.getPoints(result.LOSS, this.resultPoints);
                } else if (opponentMove === opponentMoves.PAPER) {
                    points = this.getPoints(result.WIN, this.resultPoints);;
                } else if (opponentMove === opponentMoves.SCISSORS) {
                    points = this.getPoints(result.DRAW, this.resultPoints);;
                }
                break;
        }

        return points;
    }

    private getCorrectMovePoints(opponentMove: opponentMoves, desiredResult: result): number{
        let points = 0;
        switch (desiredResult) {
            case result.WIN :
                if (opponentMove === opponentMoves.ROCK) {
                    points = this.getPoints(myMove.PAPER, this.movePoints);
                } else if (opponentMove === opponentMoves.PAPER) {
                    points = this.getPoints(myMove.SCISSORS, this.movePoints);
                } else if (opponentMove === opponentMoves.SCISSORS) {
                    points = this.getPoints(myMove.ROCK, this.movePoints);
                }
                break;
            case result.DRAW :
                if (opponentMove === opponentMoves.ROCK) {
                    points = this.getPoints(myMove.ROCK, this.movePoints);
                } else if (opponentMove === opponentMoves.PAPER) {
                    points = this.getPoints(myMove.PAPER, this.movePoints);
                } else if (opponentMove === opponentMoves.SCISSORS) {
                    points = this.getPoints(myMove.SCISSORS, this.movePoints);
                }
                break;
            case result.LOSS :
                if (opponentMove === opponentMoves.ROCK) {
                    points = this.getPoints(myMove.SCISSORS, this.movePoints);
                } else if (opponentMove === opponentMoves.PAPER) {
                    points = this.getPoints(myMove.ROCK, this.movePoints);
                } else if (opponentMove === opponentMoves.SCISSORS) {
                    points = this.getPoints(myMove.PAPER, this.movePoints);
                }
                break;
            
        }

        return points;
    }

    prepareDataForPuzzle() {
        if (this.rounds.length === 0){
            this.rounds = this.dataReader.convertFileToStringArray("src/2022/inputFiles/DayTwoInput.txt");

            this.movePoints.set(myMove.ROCK, 1);
            this.movePoints.set(myMove.PAPER, 2);
            this.movePoints.set(myMove.SCISSORS, 3);

            this.resultPoints.set(result.WIN, 6);
            this.resultPoints.set(result.DRAW, 3);
            this.resultPoints.set(result.LOSS, 0);
        }
    }
}

enum opponentMoves {
    ROCK = 'A',
    PAPER = 'B',
    SCISSORS = 'C'
}

enum myMove {
    ROCK = 'X',
    PAPER = 'Y',
    SCISSORS = 'Z'
}

enum result {
    WIN = 'Z',
    LOSS = 'X',
    DRAW = 'Y'
}