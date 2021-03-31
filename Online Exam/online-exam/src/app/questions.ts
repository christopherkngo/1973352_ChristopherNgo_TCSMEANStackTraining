export class Questions
{
    id: string;
    choiceA: string;
    choiceB: string;
    choiceC: string;
    choiceD: string;
    correct: string;

    constructor(id, choiceA, choiceB, choiceC, choiceD, correct) {
        this.id = id;
        this.choiceA = choiceA;
        this.choiceB = choiceB;
        this.choiceC = choiceC;
        this.choiceD = choiceD;
    }
}