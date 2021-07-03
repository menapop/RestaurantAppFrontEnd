import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images = ['../../../assets/1.jpg','../../../assets/2.jpg','../../../assets/2.jpg'];
  constructor() { }

  ngOnInit(): void {
  }

}
