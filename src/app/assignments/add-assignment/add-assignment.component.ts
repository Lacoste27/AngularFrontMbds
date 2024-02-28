import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent {

  // champs du formulaire
  nomAssignment = '';
  dateDeRendu = undefined;

  constructor(private assignmentService: AssignmentsService, private router: Router){}

  onSubmit(event: any) {
    if((this.nomAssignment == '') || (this.dateDeRendu === undefined)) return;


    // on crée un nouvel assignment
    //get the max id on a list of assignmen


    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    this.assignmentService.addAssignment(nouvelAssignment).subscribe((reponse) => {
      console.log(reponse);
      this.router.navigate(['home']);
    });
  }
}
