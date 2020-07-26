import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';

interface ResponseData {
  task: string;
  score: string;
}

interface SendData {
  task: string;
  answer: string;
  score: string;
}

interface Score {
  id: string;
  scoreInt: string;
}

interface Scores {
  scoreList: Score[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  task: string;
  answerText: string;
  answerControl: FormControl;
  score: string;
  scores: Score[];
  // path: string;
  visible: boolean;

  constructor(private httpClient: HttpClient,
    private router: Router) {
    // router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     console.log('event.url:', event.url);
    //     this.path = event.url;
    //   }
    // });
  }

  ngOnInit(): void {
    this.task = '';
    this.answerText = '';
    this.answerControl = new FormControl('', [Validators.required]);
    this.score = '';
    this.scores = [{ id: '', scoreInt: '' }];
    // this.path = '';
    this.visible = false;
  }

  getTask(): void {
    this.httpClient.get('http://localhost:8080/start')
      .subscribe((responeseData: ResponseData) => {
        this.task = responeseData.task;
      });
  }

  getScores() {
    const sendData: SendData = {
      task: '',
      answer: '',
      score: this.score
    };

    this.httpClient.post('http://localhost:8080/result/api', sendData)
      // .subscribe((scores:Scores) => console.log('scores:', JSON.stringify(scores)));
      .subscribe((scores: Scores) => this.scores = scores.scoreList);
  }

  DisplayResult(): void {
    // this.router.navigate(['answer']);
    this.getScores();
    this.visible = true;
  }

  start(): void {
    this.score = '';
    this.getTask();
    setTimeout(() => this.DisplayResult(), 30000);
  }

  answer(): void {
    const sendData: SendData = {
      task: this.task,
      answer: this.answerControl.value,
      score: this.score
    };

    console.log('sendData:', sendData);
    this.httpClient.post('http://localhost:8080/answer', sendData)
      .subscribe((responseData: ResponseData) => {
        this.task = responseData.task;
        this.answerText = '';
        this.score = responseData.score;
      })
  }

}
