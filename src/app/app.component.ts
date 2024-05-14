import { Component } from '@angular/core';
import { TreeTableNode } from 'primeng/api';
import { FILES } from './const/files.const';
import { TreeTable } from 'primeng/treetable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  selectedNodes: TreeTableNode | TreeTableNode[] | null = [];
  filterValue: string = '';
  readonly files = FILES;
  selectionKeys = {
    0: {
      checked: true
    }
  }

  onFilter(table: TreeTable, name: string): void {
    table.filter(this.filterValue, name, 'contains');
  }

}
