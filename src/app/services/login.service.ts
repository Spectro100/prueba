import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: Auth) { }

  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
