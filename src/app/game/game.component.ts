import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogOverviewExampleDialog } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DialogImgSelectComponent } from '../dialog-img-select/dialog-img-select.component';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game | any;
  gameId: any;


  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.gameId = params.id;
      this.firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game update', game);

          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.playedCards = game.playedCards;
          this.game.currentPlayer = game.currentPlayer;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
          this.game.playerImages = game.playerImages;
        });
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
 
  
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;


      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard as string);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openSelectContainer(playerID: number)  {
      
    console.log(playerID);
    
    const dialogRef = this.dialog.open(DialogImgSelectComponent);

    dialogRef.afterClosed().subscribe((img: string) => {
        if(img == 'delete') {
          this.game.playerImages.splice(playerID, 1)
          this.game.players.splice(playerID, 1)
          this.saveGame();
        } else if (img) {
          this.game.playerImages[playerID] = img;
          this.saveGame();
        }
    
  
    });
  
     
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game?.players.push(name);
        this.game.playerImages.push('assets/profile/1.webp')
        this.saveGame();
      }
    });
  }


  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }
}
