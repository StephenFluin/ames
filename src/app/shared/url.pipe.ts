import { Pipe, PipeTransform } from '@angular/core';


/**
 * This pipe takes a URL with or without https:// and adds https:// if it doesn't exist
 */
@Pipe({ name: 'url' })
export class UrlPipe implements PipeTransform {
    constructor() { }

    transform(value: string): any {
        
        let hasProtocol =  /^\w+:\/\//;
        let hasDomain = /^.+\..+$/;
        // If it has a protocol or no domain, don't touch it
        if (hasProtocol.test(value) || !hasDomain.test(value)) {
            return value;
        } else {
            return `https://${value}`;
        }
    }
}