import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);  

  return authService.isAdmin().then(
    (admin) => {
      if(admin){
        console.log("auth guard passed");
        return true;
      } else {
        console.log("auth guard failed");
        return false;
      }
    }
  );

};
