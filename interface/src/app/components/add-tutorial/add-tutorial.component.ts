import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  tutorial = {
    nombre: '',
    cafes: '',
    id:''
  };
  submitted = false;

  constructor(private tutorialService: TutorialService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    
    const data = {
      object: this.tutorial.nombre,
      description: this.tutorial.cafes,
    };
    this.tutorialService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });

  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      nombre: '',
      cafes: '',
      id:''
    };
  }

}
