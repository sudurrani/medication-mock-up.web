import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/_services/common/http.service';

@Component({
  selector: 'app-unit-ng-select',
  templateUrl: './unit-ng-select.component.html',
  styleUrls: ['./unit-ng-select.component.css']
})
export class UnitNgSelectComponent implements OnInit, OnChanges {
  @Input() isMultiple: boolean = false;
  @Output() selectedUnitEvent = new EventEmitter<any>();
  selectedUnit: any;
  allUnits: any[] = [];
  @Input() selectedUnitValue: number = 0;
  constructor(
    private _httpService: HttpService
  ) { }

  async ngOnInit() {
    await this.getAllUnits();

  }
  ngOnChanges(): void {
    if (this.selectedUnitValue > 0) {
      this.selectedUnit = this.allUnits.find(row => row.id == this.selectedUnitValue);
      this.selectedUnitEvent.emit(this.selectedUnit);
    }
  }
  getAllUnits = async () => {
    await this._httpService.get('Unit/GetAll')
      .subscribe((responseJSON: { isSuccess: any; resultJSON: any; }) => {
        if (responseJSON.isSuccess) {
          this.allUnits = responseJSON.resultJSON;
          if (this.selectedUnitValue > 0) {
            this.selectedUnit = this.allUnits.find(row => row.id == this.selectedUnitValue);
            this.selectedUnitEvent.emit(this.selectedUnit);
          }
        }
      });
  }
  changeEvent = async () => {
    this.selectedUnit = this.allUnits.find(row => row.id == this.selectedUnitValue);
    this.selectedUnitEvent.emit(this.selectedUnit);
  }
}
