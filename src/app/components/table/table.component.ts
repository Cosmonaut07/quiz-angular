import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface TableOptions {
  autoIndex: boolean,
  indexTitle: string
}

export interface TableAction {
  title: string,
  action: string
}

export interface TableColumn {
  title: string,
  objectKey: string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input('data') data!: any;
  @Input('ref') ref!: any;
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = []
  @Input() options: TableOptions = {
    autoIndex: false,
    indexTitle: '#',
  };
  @Output('actionCalled')
  emitter = new EventEmitter<{ method: string, param: string }>();

  constructor() {
  }

  ngOnInit(): void {
  }

  invokeAction(data: any, action: string) {
    this.emitter.emit({method: action, param: data});
  }

}
