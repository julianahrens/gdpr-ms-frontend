import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'gms-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  year: number;

  constructor() {
  }

  ngOnInit(): void {
    this.year = new Date().getFullYear()
  }

}
