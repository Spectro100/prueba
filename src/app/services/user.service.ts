import { Injectable } from '@angular/core';
import {User} from '../models/userform.model';
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

  getAllUsers(){
    return this.db.collection('/users').snapshotChanges();
  }

  editUser(user: User)
  {
    return this.db.doc('/users/' + user.id).update(user);
  }

  deleteUser(user: User)
  {
    return this.db.doc('/users/' + user.id).delete();
  }
}
