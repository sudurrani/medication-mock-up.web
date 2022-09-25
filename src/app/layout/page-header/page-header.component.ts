import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
  @Input() icon?: string;
  @Input() text?: string;
  @Input() url?:string;
  constructor() { }

  ngOnInit(): void {
  }
}
