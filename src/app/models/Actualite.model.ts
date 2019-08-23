export class Actualite {
    photo : string; // au dessus psq pas obligatoire
    constructor(public title: string, 
    public description: string,) {} /* Manque "public photos: any[]" apres description */
}