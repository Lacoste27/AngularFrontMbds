import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {
  assignments:Assignment[] = [{
      id:1,
      nom:"Devoir Angular de Michel Buffa",
      dateDeRendu: new Date("2024-02-15"),
      rendu:false
    }, {
      id:2,
      nom:"Devoir SQL3 de Serge Miranda",
      dateDeRendu: new Date("2024-01-15"),
      rendu:true
    }, {
      id:3,
      nom:"Devoir BD de Mr Gabriel Mopolo",
      dateDeRendu: new Date("2024-03-01"),
      rendu:false
    }
  ];
  
  constructor(private logging : LoggingService) { }

  getAssignments() : Observable<Assignment[]> {
    return of(this.assignments);
  }

  getAssignmentById(id:number) : Observable<Assignment | undefined> {
    var assignment = this.assignments.find(a => a.id === id);
    return of(assignment);
  }

  addAssignment(assignement: Assignment) : Observable<string> {
    let maxId = Math.max(...this.assignments.map(a => a.id));
    assignement.id = maxId + 1;
    this.assignments.push(assignement);
    this.logging.log(assignement.nom, "Ajouté");
    return of("Assignment ajouté");
  }

  updateAssignment(assignement: Assignment) : Observable<string> {
    assignement.rendu = true;
    this.logging.log(assignement.nom, "Modifié");
    return of("Assignment mis à jour");
  }

  deleteAssignment(assignement: Assignment) : Observable<string> {
    var index = this.assignments.indexOf(assignement);
    this.assignments.splice(index, 1);
    this.logging.log(assignement.nom, "Supprimé");
    return of("Assignment supprimé");
  }
}
