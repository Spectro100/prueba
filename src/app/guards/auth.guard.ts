import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const angularFireAuth = inject(AngularFireAuth);
  const user = await angularFireAuth.currentUser;

  if (!!!user)
    router.navigate(['login']);
  
  return !!user;
};
