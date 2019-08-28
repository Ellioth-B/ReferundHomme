export class Actualite {
    photo : string; // au dessus psq pas obligatoire
    constructor(public title: string, 
    public description: string,) {}
}

export class Sondage {
    
    constructor( public title: string, public subtitle: string, public description: string,) {}
}