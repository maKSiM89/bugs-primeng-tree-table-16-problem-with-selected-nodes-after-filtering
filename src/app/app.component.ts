import { Component, OnInit } from '@angular/core';
import { TreeTableNode } from 'primeng/api';
import { FILES } from './const/files.const';
import { TreeTable } from 'primeng/treetable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  selectedNodes: TreeTableNode | TreeTableNode[] | null = [];
  selectedAccountsIds = [1,2,3,4,5,6];
  filterValue: string = '';
  readonly files = FILES;

  ngOnInit(): void {
    this.selectedNodes = [];

    this.selectedAccountsIds.forEach((id: number) => {
      const key: string = id.toString();
      const selectedNodeIndex = Array.isArray(this.selectedNodes) ? this.selectedNodes.findIndex(
        (node: TreeTableNode) => node.key === key
      ) : -1;

      if (selectedNodeIndex === -1) {
        const node = this.getNodeWithKey(key, this.files);

        if (node) {
          Array.isArray(this.selectedNodes) && this.selectedNodes.push(node);
        }
      }
    });
  }

  onFilter(table: TreeTable, name: string): void {
    table.filter(this.filterValue, name, 'contains');
  }

  getNodeWithKey(key: string, nodes: TreeTableNode[]): TreeTableNode | undefined {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }

      if (node.children) {
        const matchedNode = this.getNodeWithKey(key, node.children);

        if (matchedNode) {
          return matchedNode;
        }
      }
    }

    return undefined;
  }
}
