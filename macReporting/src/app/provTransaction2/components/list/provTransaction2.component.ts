import {Component, OnInit,OnDestroy,AfterViewInit  } from '@angular/core';
import {PtService2} from '../../shared/pt2.service';
import { BehaviorSubject,Observable,Subscription ,switchMap,mergeMap} from "rxjs";
import { CellComponent, ColumnDefinition } from 'tabulator-tables';
import headerMenu from './headerMenu';

@Component({
  selector: 'mac-report-pt2',
  styleUrls: ['provTransaction2.component.scss'],
  templateUrl: './provTransaction2.component.html',
})
export class ProvTransactionComponent2 implements OnInit,OnDestroy,AfterViewInit{	
	
	proveedorArray: Record<string, unknown>[] = [];
	tempproveedorArray: Record<string, unknown>[] = [];

	public columnConfig: ColumnDefinition[];
    private subscriptions: Subscription[] = [];
	constructor(
	private ptService2 : PtService2
	) {}

 
	refresh(inputValue : any){		
		this.subscriptions.push(this.ptService2.findById(inputValue).subscribe(	
			datas => this.onSuccess(datas)
			,error => this.handleError(error)
			,() => this.onComplete()
		))	
	}
	
	onSuccess(datas : any){
		//console.log("on_success",datas);
		datas.forEach((data:any) =>{		
			this.tempproveedorArray.push(data)
		})
	}
	
	handleError(error : any){
		console.log("error",error);
	}
	
	onComplete(){
		//console.log("onComplete_task_component");
		this.proveedorArray = this.tempproveedorArray;
		//console.log("on_success2",this.proveedorArray);		
	}
	
	
	submitRequest(){
		var inputField = document.getElementById("identityName") as HTMLInputElement;
		if(inputField){
			var inputValue = inputField.value;
			if(inputValue){
				this.refresh(inputValue);
			}
		}		
	}	
	
	
/*
+-------------------------------------------------------+
|														|
|	ANG_IMPLEMENTATIONS									|
|														|
+-------------------------------------------------------+
*/	
	
	ngOnInit(): void {
/*		var headerMenu = [
    {
        label:"Hide Column",
        action:function(e :any, column: any){
            column.hide();
        }
    },
]
*/

  this.columnConfig = [
		
      { title: "Name", field: "name", resizable:true,visible:true,headerMenu:headerMenu  },
      { title: "Location", field: "applicationName" ,visible:true,resizable:true,headerMenu:headerMenu
	  
	  /*, editorParams: { autocomplete: true, allowEmpty: true, showListOnEmpty: true, valuesLookup: "all" } */},
	  { title: "Native Identity", field: "nativeIdentity",visible:true, resizable:true,headerMenu:headerMenu
	  /*, editorParams: { autocomplete: true, allowEmpty: true, showListOnEmpty: true, valuesLookup: "all" } */}
     
    ];
		
	}	
	public ngAfterViewInit(): void {
	
	}
	
	public ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());	
	}
}