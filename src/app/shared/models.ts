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
        if (rawSource) {
            this.$key = rawSource.$key ? rawSource.$key : '';
            this.name = rawSource.name;
            this.description = rawSource.description;
            this.startDate = rawSource.startDate;
            this.endDate = rawSource.endDate;

        }
    }

}

export class Expert {
    $key: string = "new";
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

export class Event {
    $key: string = "new";
    name: string;
    start: number;
    end: number;
    author: string;
    community: string;
    speakers: string[];
}