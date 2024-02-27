import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { RenduDirective } from "../shared/rendu.directive";
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from "./add-assignment/add-assignment.component";
import { AssignmentsService } from '../shared/assignments.service';

@Component({
    selector: 'app-assignments',
    standalone: true,
    providers: [],
    templateUrl: './assignments.component.html',
    styleUrl: './assignments.component.css',
    imports: [CommonModule, MatButtonModule, MatListModule, RenduDirective, AssignmentDetailComponent,
      AddAssignmentComponent]
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
  formVisible=false;

  // Mémorisation de l'assignment cliqué
  assignmentSelectionne:Assignment | undefined;

  constructor(private assignmentService: AssignmentsService){

  }


  assignments:Assignment[] = [];

  getColor(a:any) {
    return a.rendu ? 'green' : 'red';
  }

  ngOnInit() {
    console.log("Appeleez avant l'affichage des composants");
    this.assignmentService.getAssignments().subscribe((assignments) => {
      console.log("Assignments reçus dans le composant");
      this.assignments = assignments;
    });
  }

  assignmentClicke(a:Assignment) {
    console.log("Assignment cliqué: " + a.nom);

    this.assignmentSelectionne = a;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  ajouteAssignement(event:Assignment) {
    this.assignmentService.addAssignment(event).subscribe((reponse) => {
      console.log(reponse);
      this.formVisible = false;
    });
  }

  deleteAssignement(){
    if(this.assignmentSelectionne){
      var index = this.assignments.indexOf(this.assignmentSelectionne);
      this.assignments.splice(index, 1);
      this.assignmentSelectionne = undefined;
    }
  }
}
