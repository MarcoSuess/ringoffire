import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit {
  @Input() name: any;
  @Input() playerImage = 'assets/profile/1.webp';
  @Input() playerActive:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}