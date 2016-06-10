/**
 * @TODO should this be a class or interface?
 */

export class Mission {
    $key: string;
    name: string;
    description: string;
    startDate: number;
    endDate: number;
    
    constructor(rawSource?) {
        if(rawSource) {
            this.$key = rawSource.$key ? rawSource.$key : '';
            this.name = rawSource.name;
            this.description = rawSource.description;
            this.startDate = rawSource.startDate;
            this.endDate = rawSource.endDate;
            
        }
    }
    
}

export class Expert {
    $key: string;
    bio: string;
    email: string;
    firstName: string;
    lastName: string;
    pictureUrl: string;
    webpageUrl: string;
    resumeUrl: string;
    twitter: string;
    linkedin: string;
    city: string;
    country: string;
    
    isGDE: boolean;
    isConsultant: boolean;
    isEducator: boolean;
    
    languages : string[];
    missions: string[];
    communities: string[];
    
}