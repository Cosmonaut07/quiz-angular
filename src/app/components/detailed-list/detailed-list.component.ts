import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detailed-list',
  templateUrl: './detailed-list.component.html',
  styleUrls: ['./detailed-list.component.css']
})
export class DetailedListComponent implements OnInit {
  @Input() data: any;
  @Input() fieldOptions = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
  }
  constructor() { }

  ngOnInit(): void {
  }

}
