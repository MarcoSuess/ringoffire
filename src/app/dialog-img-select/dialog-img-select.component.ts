import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-img-select',
  templateUrl: './dialog-img-select.component.html',
  styleUrls: ['./dialog-img-select.component.scss'],
})
export class DialogImgSelectComponent implements OnInit {

  public profileImages: string[]  = [
    'assets/profile/1.webp',
    'assets/profile/2.png',
    'assets/profile/monkey.png',
    'assets/profile/pinguin.svg',
    'assets/profile/serious-woman.svg',
    'assets/profile/winkboy.svg'
  ];

  ngOnInit(): void {}

  constructor(public dialogRef: MatDialogRef<DialogImgSelectComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
