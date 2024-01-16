import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() data: any;
  @Input() fieldOptions = {
    nameField: 'name',
    descriptionField: 'description',
    idField: 'id',
    hasActions: true,
  }
  @Output() onEditClickEmitter: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClickEmitter: EventEmitter<any> = new EventEmitter();
  constructor() {  }

  ngOnInit(): void {
  }

  public onEditClick(id: any) {
    this.onEditClickEmitter.emit(id);
  }

  public onDeleteClick(id: any) {
    this.onDeleteClickEmitter.emit(id);
  }
}
