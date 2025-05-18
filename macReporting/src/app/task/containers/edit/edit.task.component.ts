import {Component, Inject,HostListener, OnDestroy, OnInit,AfterViewInit,EventEmitter,Input,OnChanges,SimpleChanges} from '@angular/core';

@Component({
    selector: 'edit-task-component',
    templateUrl: './edit.task.component.html',
	  styleUrls: ['./edit.task.component.scss'],
	
  
})
//https://github.com/raceconditionrunning/raceconditionrunning.github.io/blob/main/pages/light-rail-relay-24.html#L1143
//RelayResultsTable
export class EditTaskComponent implements OnInit, OnDestroy,AfterViewInit,OnChanges  {
	


/*

+-------------------------------------------------------+
|														|
|	ANG_IMPLEMENTATIONS									|
|														|
+-------------------------------------------------------+

*/	
	
	public ngOnInit() {
	
	}
	public ngAfterViewInit(): void {
	
	}
	 ngOnChanges(changes:  SimpleChanges): void {
    console.log("===========================");
  }
	public ngOnDestroy() {
	
	}
}