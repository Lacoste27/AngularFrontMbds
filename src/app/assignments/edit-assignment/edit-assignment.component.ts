import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { MatFormField } from '@angular/material/form-field';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css'
})
export class EditAssignmentComponent implements OnInit {

  nomAssignment!: string;
  dateDeRendu!: Date;
  assignment: Assignment | undefined;

  constructor(private assignmentService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // le "+" force l'id de type string en "number"
    const id = this.route.snapshot.params['id'];

    this.assignmentService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
}
