import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() name: any;
  @Input() id: any;
  @Input() description: any;
  @Input() hasActions: any;
  @Output() onEditClickEmitter: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClickEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onEditClick(id: any) {
    this.onEditClickEmitter.emit(id);
  }

  public onDeleteClick(id: any) {
    this.onDeleteClickEmitter.emit(id);
  }

}
