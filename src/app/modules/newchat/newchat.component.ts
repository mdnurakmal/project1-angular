import { Component,EventEmitter,HostBinding, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.component.html',
  styleUrls: ['./newchat.component.scss'],
  animations: [
    trigger('slideMenu', [
      state('false', style({
        transform: 'translateX(-250px)'
      })),
      state('true', style({
        transform: 'translateX(0)'
      })),
      transition('true <=> false', animate('400ms ease-in-out'))
    ])
  ]
})
export class NewchatComponent implements OnInit {
  @Input() visible : boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  searchText: string;
  constructor() { 

  }

  ngOnInit(): void {
  }

  close($event) {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

}
