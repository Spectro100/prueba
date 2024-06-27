import { Injectable } from '@angular/core';
import User from '../models/userform.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFirestore) { }

  addUser(user: User)
  {
    const userRef = this.db.collection('users');
    return userRef.add(user);
  }
}
