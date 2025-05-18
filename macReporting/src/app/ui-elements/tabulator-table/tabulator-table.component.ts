import { Component, OnInit, Input,ChangeDetectionStrategy,OnChanges,SimpleChanges,ViewChild,ChangeDetectorRef,ElementRef ,AfterViewInit,OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
//import 'rxjs/add/observable/of';
import {of, from,Subscription } from 'rxjs';
import { CellComponent, ColumnComponent, ColumnDefinition, EmptyCallback, RowComponent,Tabulator, TabulatorFull, ValueBooleanCallback, ValueVoidCallback } from 'tabulator-tables';
//import { TabulatorColumn } from './table/TabulatorData';
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
/*
 const headerMenu = (displayTitles) => (_, column) => {
  const table = column.getTable();
  const columns = table.getColumns();
  const menu = [];

               
return menu;
               
 };
 */
@Component({
  selector: 'mac-table',
  templateUrl: './tabulator-table.component.html',
      changeDetection: ChangeDetectionStrategy.OnPush,

  styleUrls: ['./tabulator-table.component.scss']
})
export class TabulatorTableComponent implements OnInit,AfterViewInit,OnChanges,OnDestroy  {
//headerMenu
//https://github.com/CourtHive/TMX/blob/2ab8e297009e69a3263126ba99750926d441297e/src/components/tables/common/headerMenu.ts#L6	//https://github.com/sergevoina/identityiq-plugin-scaffolding/blob/1d48d36914793aacf5365ed5e83e3f74e50d9783/ng2page/src/app/csrf.interceptor.ts#L21
//https://github.com/WISE-Community/WISE-Client/blob/2800c39752b48b35c4931c2e95e77d27c8f02bd6/src/assets/wise5/components/table/tabulator-table/tabulator-table.component.ts#L48
//https://github.com/David-Mawer/tabulator-angular-sample/blob/51c4ded6b55962afbb67258c0fd015f18bbdd3f4/src/app/test/test.component.ts
//isDeleted
//https://github.com/theborderland/map/blob/5b6b0b8e31497234e05057647a16d7ea5f448b5b/src/stats.ts#L135
//copy range type sql
//https://github.com/gnovaro/beekeeper-studio/blob/ce8f29ba1859bdc4deb00477ffcb8d29fff028b4/apps/studio/src/lib/menu/tableMenu.ts#L7
///https://github.com/Bestyan/meldeschein-autofill/blob/fd5170a08f11bfc5c57dccc3bdb1d5814bf0c325/src/js/main/util/ui_helper.ts#L6
//downloadSelected
//https://github.com/search?q=repo%3ABCYCAData%2Fsoc%20downloadSelected&type=code
 // printRowRange: "visible",
    //  printAsHtml: true,
//https://github.com/mbeaner/weBoot/blob/c3aa878f6150301752389dbd9181bbca3b5d5989/client/src/components/ProductSidenav/VariantTable.js#L131
//addControlColumns
//https://github.com/Juanpi94/SP-TI/blob/f275fbc3cd60fc388ae18480d25d28e289751f1e/source/js/table.js#L226
//https://github.com/micrology/prsm/blob/39117b0084719e6257066f1313bf333d347b3d9a/js/table.js#L432
//footerElement
//https://github.com/nickswalker/calcourses.nickwalker.us/blob/cc039d76f1b9af46a2d740c34099e21900934e78/js/CoursesView.js#L319
	//@Input() tabData: Observable<RowDefinition[]>; // see http://tabulator.info/docs/5.3/data
	  //@Input() tabData: Record<string, unknown>[] = [];
	 @Input() tabData2: Record<string, unknown>[] = [];
	 // @Input() _tabData: Observable<Record<string, unknown>[]>;
	  // @Input tabData: BehaviorSubject<Record<string, unknown>[] | null>;
	// _tabData = new BehaviorSubject<Record<string, unknown>[]>([]);
	//@Input() tabColumns: Observable<ColumnDefinition[]>; // see http://tabulator.info/docs/5.3/columns
	@Input() tabColumns: any[]; // see http://tabulator.info/docs/5.3/columns
	
//rowData: Observable<RowDefinition[]>;
 // headers: Observable<ColumnDefinition[]>;
	// @ViewChild('agGrid', { static: true }) agGrid: AgGridAngular;
	// @ViewChild('agGrid') agGrid: AgGridNg2;


  // private rowData = [];
  private columnDefs = [];
  private headerStrArr = [];

 // private rowDataSub = new BehaviorSubject<any[]>();
 // private colmnSub = new BehaviorSubject<any[]>();
  private subscriptions: Subscription[] = [];
 // rowDataObs = this.rowDataSub.asObservable();
  //colmnObs = this.colmnSub.asObservable();
   // @ViewChild('tabulatorContainer') tabulatorContainer: ElementRef | undefined;
	@ViewChild('tabulatorContainer', { static: true }) tableContainer: ElementRef;
	// @ViewChild('tabularGridWrapper', { static: true }) wrapperDiv!: ElementRef<HTMLDivElement>;
private tableDiv = document.createElement('div'); // this is the div that will contain that tabulator-grid HTML.
private myTable?: TabulatorFull; // this will become a reference to the tabulator-grid object
  tableEl = document.createElement('div');
  private gridClosing = false;
  @Input() columnConfig: ColumnDefinition[];
  
	constructor() {}
	ngOnInit() {}
	
	
	/*
	getHeaderMenu() : any{
    var menu :any = [];
    var columns = this.columnConfig;

    
	    for(let column of columns){

        //create checkbox element using font awesome icons
        let icon = document.createElement("i");
        icon.classList.add("fas");
        icon.classList.add(column.visible ? "fa-check-square" : "fa-square");

        //build label
        let label = document.createElement("span");
        let title = document.createElement("span");

        title.textContent = " " + column.title;

        label.appendChild(icon);
        label.appendChild(title);

        //create menu item
		
        menu.push({
            label:label,
            action:function(e : any){
                //prevent menu closing
                e.stopPropagation();

                //toggle current column visibility
                column.toggle();
				console.log("hello:",column);
console.log("hello:"+column.visible);
//console.log("hello:"+column.toggle);
                //change menu item icon
                if(column.visible){
                    icon.classList.remove("fa-square");
                    icon.classList.add("fa-check-square");
                }else{
                    icon.classList.remove("fa-check-square");
                    icon.classList.add("fa-square");
                }
            }
        });
		
			
    }


   return menu;
}
*/
 drawCustomTable(){
	  if ((this.gridClosing) || (!this.columnConfig)) {
      return;
    }
    // Re-route date sorting and editing to local overrides.
    //  (allows Angular to decide how/when the dayjs library is in use)
    /*this.fastForEach(this.columnConfig, colConfigEntry => {
      if (colConfigEntry.sorter == "date") {
        colConfigEntry.sorter = this.dateSorter.bind(this);
        colConfigEntry.editor = this.dateEditor.bind(this);
      }
    });
	*/
	
	 if (!this.myTable) {
console.log("i_here");
//console.log("this.tabData:"+this.tabData);
console.log("this.tabData:"+this.columnConfig);
      // create the table with the given Angular parameters
      // for details about the Tabulator parameters - check http://tabulator.info/docs/4.2/options
	  
	 

	
	

	  //this.convertDynamicProperties(options,true);
	 console.log("drawTable:",this.tabData2);
      this.myTable = new TabulatorFull(this.tableDiv, {
		data:  []
		,reactiveData: true // enable data reactivity - means that array content changes get reflected by the grid (without Angular having to worry)
		, columns: this.columnConfig
	//	,layout: 'fitDataTable'
		,height: 400
		,pagination :true  //enable.
		//,pagination: "local"
		,selectableRows:true,
		rowHeader: {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false},
		downloadRowRange:'all', //change default selector to selected
		paginationSize:5 // this option can take any positive integer value
		,movableColumns:true	
		//,resizableRows:true,
    //resizableRowGuide:true,
    //resizableColumnGuide:true,
	/*, rowContextMenu: [
        {
            label:"Hide Column",
            action:function(e, column){
                column.hide();
            }
        },
        {
            separator:true,
        },
        {
            disabled:true,
            label:"Move Column",
            action:function(e, column){
                column.move("col");
            }
        }
    ]
	*/
   , columnDefaults:{
        resizable:true,
	//	headerMenu:headerMenu
    }
		,paginationSizeSelector: [10,15], //enable page size select element and generate list options
		paginationCounter:'rows',
		footerElement: "<footer class='tabulator-footer text-secondary fw-normal'><span id='course-count'></span> courses, <span id='after-filter-count'></span> after filters</footer>"
	  
      });
	 
	      this.tableContainer.nativeElement.appendChild(this.tableDiv);
		
	 }
 }
  
  ngOnDestroy(): void {
		this.gridClosing = true;
		// Not sure if this is necessary - but remove all rows and columns from the grid.
		if (this.myTable) {
			this.myTable.setData([]);
			this.myTable.setColumns([]);
		}
		this.subscriptions.forEach(subscription => subscription.unsubscribe());	
	}
	ngAfterViewInit(): void {
		console.log("ng_after_view_init_tabluator_table");
		this.drawCustomTable();
		
	}
	
	
  
	private tryDrawTable(): void {


	}
	
	
	ngOnChanges(changes: SimpleChanges): void {
		if(this.myTable){
			console.log("ng_on_changes",this.tabData2);
			this.myTable.setData(this.tabData2);
			
		}
	}
	
	
	private drawTable(changes: SimpleChanges): void {




	}
  
	downloadToExcel(event:any){
		console.log("download_to_excel");
		if(this.myTable){
			this.myTable.download("xlsx", "data.xlsx", {sheetName:"My Data"});
		}
	}
  
	
	

}