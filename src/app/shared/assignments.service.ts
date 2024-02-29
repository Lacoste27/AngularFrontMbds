import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, catchError, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {
  assignments:Assignment[] = [
  ];

  baseurl = "http://localhost:8010/api/assignments";
  
  constructor(private logging : LoggingService, private http: HttpClient) { }

  getAssignments() : Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.baseurl);
  }

  // renvoie un assignment par son id, renvoie undefined si pas trouvé
  getAssignment(id:string):Observable<Assignment|undefined> {
    console.log(id);
    return this.http.get<Assignment>(this.baseurl + "/" + id)
    .pipe(
        catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
      /*
      map(a => {
        a.nom += " MODIFIE PAR LE PIPE !"
        return a;
      }),
      tap(a => console.log("Dans le pipe avec " + a.nom)),
      map(a => {
        a.nom += " MODIFIE UNE DEUXIEME FOIS PAR LE PIPE !";
        return a;
      })
      */
    );
    //let a = this.assignments.find(a => a.id === id);
    //return of(a);
  }

  // Methode appelée par catchError, elle doit renvoyer
  // i, Observable<T> où T est le type de l'objet à renvoyer
  // (généricité de la méthode)
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
 };

  getAssignmentById(id:string) : Observable<Assignment | undefined> {
    var assignment = this.assignments.find(a => a._id === id);
    return of(assignment);
  }

  addAssignment(assignment: Assignment) : Observable<any> {
     return this.http.post<Assignment>(this.baseurl, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // l'assignment passé en paramètre est le même objet que dans le tableau
    // plus tard on verra comment faire avec une base de données
    // il faudra faire une requête HTTP pour envoyer l'objet modifié
     //return of("Assignment modifié avec succès");
     return this.http.put<Assignment>(this.baseurl, assignment);
  }
 
  deleteAssignment(assignment:Assignment):Observable<any> {
    console.log(assignment);
     // on va supprimer l'assignment dans le tableau
     //let pos = this.assignments.indexOf(assignment);
     //this.assignments.splice(pos, 1);
     //return of("Assignment supprimé avec succès");
     return this.http.delete(this.baseurl + "/" + assignment._id);
  }
}
