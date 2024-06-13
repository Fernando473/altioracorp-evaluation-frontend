import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
})
export class CrudComponent<T> implements OnInit {
  @Input() columns: string[] = [];
  @Input() displayColumns: string[] = [];
  @Input() apiEndpoint: string = '';
  @Input() model:string = '';
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  firstName:string = "";
  lastName:string = "";

  editingItem: T | null = null;

  constructor(private crudService: CrudService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  defineItem(item:T): number{
    let id:any = null;
    if (this.model === 'order'){
      id = (item as any).orderID;
    }else if(this.model == 'item'){
      id = (item as any).itemCode
    } else if(this.model == 'client'){
      id = (item as any).id
    }
    return id;
  }

  loadData() {
    this.crudService.getItems<T>(this.apiEndpoint).subscribe(data => {
      this.firstName = ""
      this.lastName = ""
      this.dataSource.data = data;
    });
  }

  add() {
    let data = {
      'firstName':this.firstName,
      'lastName':this.lastName
    }
    if (!this.firstName) return;
    if(!this.lastName) return;
    this.crudService.addItem(this.apiEndpoint, data).subscribe(data => {
      this.loadData();
    })
  }

  edit(item: T) {
    let id = this.defineItem(item)
    this.firstName = (item as any).firstName
    this.lastName = (item as any).lastName

    this.crudService.updateItem(this.apiEndpoint,id,item).subscribe(data =>{
      this.loadData()
    })
  }


  delete(item: T) {
    let id = this.defineItem(item)
    this.crudService.deleteItem(this.apiEndpoint, id).subscribe(() => {
      this.loadData();
    });
  }


}

