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
    user.id = this.db.createId();
    const userRef = this.db.collection('users');
    return userRef.add(user);
  }

  getAllUsers(){
    return this.db.collection('/users').snapshotChanges();
  }
}
