import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({

    selector: 'login',
    template: `
    <h2>Login</h2>
    <form>
        <label><input #username i18n-placeholder placeholder="username"></label>
        <label><input type="password" i18n-placeholder placeholder="password"></label>
        <div>
            <button (click)="loginPassword(username.value, password.value);" i18n>Login</button>
            <button (click)="loginGoogle()" i18n>Login With Google</button>
            <button (click)="loginAnonymous()" i18n>Login Anonymously</button>
        </div>
        
    </form>
    
    
    `,

})
export class LoginComponent {
    constructor(private auth: AuthService) {
    }

    loginGoogle() {
        this.auth.loginGoogle();
    }
    loginPassword(username, password) {
        this.auth.loginPassword(username, password);
    }
    loginAnonymous() {
        this.auth.loginAnonymous();
    }

}