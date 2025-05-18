import {Component, Inject, Input,OnInit,ViewChild,ViewChildren,OnDestroy,AfterViewInit,AfterContentChecked,ChangeDetectorRef,  ComponentFactoryResolver} from '@angular/core';
//import { Observable } from 'rxjs/internal/Observable';
//import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
//import { CellComponent, ColumnDefinition } from 'tabulator-tables';
//import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
//import { ReportDirective } from '../shared/report.directive';
//import { ReportService } from '../shared/report.service';
//import {ReportItem } from '../shared/report.item';
import {of, from } from 'rxjs';
import { BehaviorSubject,Observable,Subscription ,switchMap,mergeMap} from "rxjs";
import { CellComponent, ColumnDefinition } from 'tabulator-tables';
import { TabulatorData } from '../../../ui-elements/tabulator-table/table/TabulatorData';
import {TaskService} from '../../shared/task.service';
import {Task} from '../../shared/task.model';
import { Validators } from '@angular/forms';
/*
interface RowDefinition {
    id: number;
    name: string;
    
}
interface ColumnDefinition {
    title: string;
    field: string;
    
}
*/
@Component({
  selector: 'mac-report-task',
  styleUrls: ['task.component.scss'],
  templateUrl: './task.component.html',
 
  
})

export class TaskComponent implements OnInit,OnDestroy,AfterViewInit{	
	
	proveedorArray: Record<string, unknown>[] = [];
	tempproveedorArray: Record<string, unknown>[] = [];
	 //  @Input() post: any;
label:string = "none";
	
// rowData: Observable<RowDefinition[]>;
 // headers: Observable<ColumnDefinition[]>;
  headers: any[]=[];
  _data = new BehaviorSubject<Record<string, unknown>[]>([]);
 tabulatorData: TabulatorData;

  public tableData: Record<string, unknown>[];
  // public tempData: Record<string, unknown>[];
   tempData = this._data.asObservable();
  //public tableData:Task[];
   public columnConfig: ColumnDefinition[];
    private subscriptions: Subscription[] = [];
	constructor(
	private taskService : TaskService
	) {}
	
	initCatalogos() {	
		  this.columnConfig = [
		
      { title: "Name", field: "name", resizable:true },
      { title: "Location", field: "completed", width: 130, /*, editorParams: { autocomplete: true, allowEmpty: true, showListOnEmpty: true, valuesLookup: "all" } */}
     
    ];
	
	}
	
	
/*
+-------------------------------------------------------+
|														|
|	GET_DATA											|
|														|
+-------------------------------------------------------+
*/	
	
	
	refresh(){	
		this.initCatalogos();	
			this.subscriptions.push(this.taskService.findAll().subscribe(	
			datas => this.onSuccess(datas)

			,error => this.handleError(error)
			,() => this.onComplete()
		))	
	}
	
	onSuccess(datas : any){
		console.log("on_success",datas);
		//this._data.next(datas);
		datas.objects.forEach((data:any) =>
		{
			
			//this._data.next(data);
			this.tempproveedorArray.push(data)
		})
		
		// this._data.next([...this._data.getValue(), ...datas.objects])
	//	this._data.next(datas.objects);
		//this.tempData = this._data.asObservable();
		/*this.tempData.subscribe(
			(datas2 : any) => this.proveedorArray.push(datas2["name"])
			//datas => this._data.next(datas)
			,error => this.handleError(error)
			,() => this.onComplete()
		)
		*/
		console.log("on_success2",this.proveedorArray);
		//var tasks : Task[] = new Array();;
		//this.tempData = new Array();;
		/*datas.objects.forEach((data:any) => {
			var task:any = {};
			task.name = data["name"];
			 this.tempData.push(task);;
			/* Object.keys(data).forEach((key: string) => {
				//console.log("key:"+key);
				 
				   this.tempData.push(task);;
			 })
			
		});
		*/
		//this.tableData = tasks;
		 //this.tableData= this.tempData;;
		  //console.log("onSuccess",this.tableData);
	}
	
	handleError(error : any){
		console.log("error",error);
	}
	
	onComplete(){
		console.log("onComplete_task_component");
		this.proveedorArray = this.tempproveedorArray;
			console.log("on_success2",this.proveedorArray);
		// this.tableData= this.tempData;;
		 //console.log("onComplete",this.tableData);
	}

/*
+-------------------------------------------------------+
|														|
|	ANG_IMPLEMENTATIONS									|
|														|
+-------------------------------------------------------+
*/	
	
	ngOnInit(): void {
		console.log("identity init started identity");	
		console.log("identity init started identity");	
		this.refresh();
	}	
	public ngAfterViewInit(): void {
	
	}
	
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());	
	}
}	
	
	
	
 
  
