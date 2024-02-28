import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  

  constructor() { }

  log(assignementNom: string, action: string){
    console.log("L'assignment " + assignementNom + " a été " + action);
  }
}
