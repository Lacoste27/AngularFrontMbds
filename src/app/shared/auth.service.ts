import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor() { }


  logIn(){
    this.loggedIn = true;
  }

  logOut(){
    this.loggedIn = false;
  }

  //méthode qui indiquesi on est connecté en tant qu'admin ou pas
  // pour le moment, on est connecté
  // En fait cette méhtode ne renvoie pas un booléen mais un objet de type Promise qui va renvoyer un booléen 
  // c'est imposé par Angular pour l'authentification asynchrone 
  isAdmin(){
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }
}
