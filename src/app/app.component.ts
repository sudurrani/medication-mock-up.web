import { Component } from '@angular/core';


export interface Tile {
  cols: number;
  rows: number;
  text: string;
  border: string;
 }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Medication Mock-up';
  tiles: Tile[] = [
    {text: 'Tile 1', cols: 2, rows: 1 ,border: '3px double purple'},
    {text: 'Tile 2', cols: 2, rows: 1 ,border: '3px double red'},
    {text: 'Tile 3', cols: 2, rows: 1 ,border: '3px double skyblue'},
    {text: 'Tile 4', cols: 2, rows: 1 ,border: '3px double yellow'},
    ];
}
