import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detailed-list-item',
  templateUrl: './detailed-list-item.component.html',
  styleUrls: ['./detailed-list-item.component.css']
})
export class DetailedListItemComponent implements OnInit {

  @Input() field1: any;
  @Input() field2: any;
  @Input() field3: any;
  @Input() field4: any;
  @Input() field5: any;
  @Input() field6: any;
  @Input() field7: any;
  @Input() fieldOptions: any;


  constructor() { }

  ngOnInit(): void {
  }

}
