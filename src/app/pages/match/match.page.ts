import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/model/Game';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {
  @Input("nota") game: Game;

  constructor() { }

  ngOnInit() {
    console.log(this.game)
  }


}
