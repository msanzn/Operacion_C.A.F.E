import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  receive_var;
  capsulas_restantes;
  constructor(
    private tutorialService: TutorialService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.http.get<any>('http://192.168.10.105:8008/cafe_num').subscribe({
        next: data => {
            console.log(data);
            this.capsulas_restantes= data;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
    this.retrieveTutorials();
  }
  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe(
      (data) => {
        this.tutorials = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }
  setActiveTutorial(tutorial, index): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }
  removeAllTutorials(): void {
    this.tutorialService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatecafes(): void {
    console.log(typeof this.currentTutorial.description)
    var c = Number(this.currentTutorial.description);
    console.log(typeof c)
    c=c + 1;
    this.capsulas_restantes=this.capsulas_restantes -1;
    console.log(c)
    this.currentTutorial.description=c.toString()
    console.log(this.currentTutorial.description)
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    this.http.post<any>('http://192.168.10.105:8008/',"").subscribe({
      next: data => {
          console.log(data);
          this.capsulas_restantes= data;
      },
      error: error => {
          console.error('There was an error!', error);
      }
    })
  }

  paycafes(): void {
    this.currentTutorial.description="0"
    console.log(this.currentTutorial.description)
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe(
        response => {
          console.log(response);
          window.location.reload();
        },
        error => {
          console.log(error);
        });
  }
  searchTitle(): void {
    console.log(this.title)
    this.tutorialService.findByTitle(this.title).subscribe(
      (data) => {
        this.tutorials = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
