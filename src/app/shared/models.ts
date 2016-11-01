/** 
 * Missions are community-led collaborations
 */
export class Mission {
    $key: string;
    name: string;
    description: string;
    startDate: number;
    endDate: number;
    participants: string[];
    organizer: string;
    bannerUrl: string;

    constructor(rawSource?) {
        if (rawSource) {
            this.$key = rawSource.$key ? rawSource.$key : '';
            this.name = rawSource.name;
            this.description = rawSource.description;
            this.startDate = rawSource.startDate;
            this.endDate = rawSource.endDate;

        }
    }

}

/**
 * An Expert represents all developers who sign up or are listed on the site, 
 * not only those who are marked as experts
 */
export class Expert {
    $key: string = "new";
    bio: string;
    email: string;
    name: string;
    picUrl: string;
    website: string;
    resumeUrl: string;
    twitter: string;
    linkedIn: string;
    github: string;
    city: string;
    country: string;

    isGDE: boolean;
    isConsultant: boolean;
    isEducator: boolean;
    isExpert: boolean;
    isGoogler: boolean;

    languages: string[];
    missions: string[];
    communities: string[];

}

export class Community {
    $key: string = "new";
    icon: string;
    name: string;
    type: string;
    description: string;
    location: string;
    state: string;
    organizer: string;
    members: string[];
    span: string;
}



export class Resource {
    $key: string = "new";
    category: string;
    subcategory: string;
    title: string;
    url: string;
    desc: string;
    rev: boolean = true;

    validate(): boolean {
        return !(
            !this.category ||
            !this.subcategory ||
            !this.title ||
            !this.url);
    }
}

export class Event {
    $key: string = "new";
    name: string;
    start: number;
    end: number;
    author: string;
    community: string;
    endDate: Date;
    startDate: Date;
    logoUrl: string;
    url: string;
    description: string;
    location: string;

    leads: string[];
    speakers: string[];
}
