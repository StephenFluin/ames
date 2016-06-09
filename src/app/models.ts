/**
 * @TODO should this be a class or interface?
 */

export class Mission {
    $key: string;
    name: string;
    startDate: number;
    endDate: number;
    
    constructor(rawSource?) {
        if(!rawSource) {
            
        } else {
            this.$key = rawSource.$key ? rawSource.$key : '';
            this.name = rawSource.name;
            this.startDate = rawSource.startDate;
            this.endDate = rawSource.endDate;
        }
    }
    
}

export class Expert {
    $key: string;
    name: string;
}