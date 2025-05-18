import {Component, OnInit,OnDestroy,AfterViewInit  } from '@angular/core';
import {PtService} from '../../shared/pt.service';
import { BehaviorSubject,Observable,Subscription ,switchMap,mergeMap} from "rxjs";
import { CellComponent, ColumnDefinition } from 'tabulator-tables';

@Component({
  selector: 'mac-report-pt',
  styleUrls: ['provTransaction.component.scss'],
  templateUrl: './provTransaction.component.html',
})
export class ProvTransactionComponent implements OnInit,OnDestroy,AfterViewInit{	
	
	proveedorArray: Record<string, unknown>[] = [];
	tempproveedorArray: Record<string, unknown>[] = [];

	public columnConfig: ColumnDefinition[];
    private subscriptions: Subscription[] = [];
	constructor(
	private ptService : PtService
	) {}

	refresh(){		
		this.subscriptions.push(this.ptService.findAll().subscribe(	
			datas => this.onSuccess(datas)
			,error => this.handleError(error)
			,() => this.onComplete()
		))	
	}
	
	onSuccess(datas : any){
		console.log("on_success",datas);
		datas.objects.forEach((data:any) =>{		
			this.tempproveedorArray.push(data)
		})
	}
	
	handleError(error : any){
		console.log("error",error);
	}
	
	onComplete(){
		console.log("onComplete_task_component");
		this.proveedorArray = this.tempproveedorArray;
		console.log("on_success2",this.proveedorArray);		
	}
	
/*
+-------------------------------------------------------+
|														|
|	ANG_IMPLEMENTATIONS									|
|														|
+-------------------------------------------------------+
*/	
	
	ngOnInit(): void {
		  this.columnConfig = [
		
      { title: "Name", field: "name", resizable:true },
      { title: "Location", field: "created", resizable:true /*, editorParams: { autocomplete: true, allowEmpty: true, showListOnEmpty: true, valuesLookup: "all" } */}
     
    ];
		this.refresh();
	}	
	public ngAfterViewInit(): void {
	
	}
	
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());	
	}
}