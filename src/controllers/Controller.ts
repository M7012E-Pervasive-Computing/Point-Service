
export default abstract class Controller {

    name: string;

    constructor(name: string) {
        this.name = name; 
    }

    public getName(): string {
        return this.name; 
    }

}