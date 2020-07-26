import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface SendData {
  score: string;
}

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() score: string;
  scores: string[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  getScores() {
    const sendData: SendData = {
      score: this.score
    };

    this.httpClient.post('http://localhost:8080/result/api', sendData)
      // .subscribe((scores: string[]) => console.log('scores:', scores));
      .subscribe((scores: string[]) => this.scores = scores);
  }


}
