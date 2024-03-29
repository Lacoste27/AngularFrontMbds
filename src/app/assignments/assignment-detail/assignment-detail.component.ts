import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Assignment } from '../assignment.model';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule, RouterLink],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {

  assignmentTransmis!: Assignment | undefined;

  constructor(private assignementService: AssignmentsService, 
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router){
  }

  ngOnInit(): void {
    var id = this.route.snapshot.params['id'];

    this.assignementService.getAssignment(id).subscribe((assignment) => { 
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    // on a cliqué sur la checkbox, on change le statut de l'assignment
    if(this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.assignementService.updateAssignment(this.assignmentTransmis).subscribe((assignments) => {
        console.log(assignments);
        this.router.navigate(['home']);
      });
    }
  }

  onDelete() {
    if(this.assignmentTransmis){
      this.assignementService.deleteAssignment(this.assignmentTransmis).subscribe((reponse) => { 
        this.assignmentTransmis = undefined;
        this.router.navigate(['home']);
      });
    }
  }

  isAdmin(){
    return this.authService.loggedIn;
  }
}
