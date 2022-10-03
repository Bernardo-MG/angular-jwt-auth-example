import { Component, OnInit } from '@angular/core';
import { Data } from '../model/data';
import { DataService } from '../service/data.service';

@Component({
  selector: 'data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.sass']
})
export class DataListComponent {

  data: Data[] = [];

  constructor(private dataService: DataService) {
    dataService.getData().subscribe(data => this.data = data);
  }

}
