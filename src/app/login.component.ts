import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    template: `
    <h2>Login</h2>
    <form>
        <label><input #username placeholder="username"></label>
        <label><input type="password" #password placeholder="password"></label>
        <div>
            <button (click)="loginPassword(username.value, password.value);">Login</button>
            <button (click)="loginGoogle()">Login With Google</button>
            <button (click)="loginAnonymous()">Login Anonymously</button>
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