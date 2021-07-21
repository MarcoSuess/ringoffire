import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogOverviewExampleDialog } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined;
  game: Game | undefined;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game) {
      this.currentCard = this.game?.stack.pop();
      this.pickCardAnimation = true;

      this.game.currentPlayer++;

      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

   

      setTimeout(() => {
        this.game?.playedCards.push(this.currentCard as string);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);

  
    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game?.players.push(name);
      }
    });
  }
}
