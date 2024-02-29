import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {
  assignments:Assignment[] = [
  ];

  baseurl = "http://localhost:8010/api/assignments/";
  
  constructor(private logging : LoggingService, private http: HttpClient) { }

  getAssignments() : Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.baseurl);
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
