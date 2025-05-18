import { Component,ComponentFactoryResolver,ViewChild, ViewContainerRef,ComponentRef } from '@angular/core';
import {EditPtComponent} from './provTransaction/containers/edit/edit.pt.component';
import {EditPtComponent2} from './provTransaction2/containers/edit/edit.pt2.component';
import {EditTaskComponent} from './task/containers/edit/edit.task.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'macReporting';
	 @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
	 componentRef: ComponentRef<any>;
	public components = [EditTaskComponent, EditPtComponent,EditPtComponent2];
	constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
	 
	public renderTask(): void {
		
		
		const currentComponent = this.components[0];		
		this.setElement(currentComponent);
	}
  
   public renderProvTransaction(): void {
	   
	  const currentComponent = this.components[1];		
		this.setElement(currentComponent);
   }
    public renderProvTransaction2(): void {
	   
	  const currentComponent = this.components[2];		
		this.setElement(currentComponent);
   }
   	setElement(currentComponent : any){
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(currentComponent as any);
		let viewContainerRef = this.container;
		viewContainerRef.clear();
		this.componentRef = viewContainerRef.createComponent(componentFactory);
		this.componentRef.changeDetectorRef.detectChanges();
		

	}
   	ngOnDestroy() {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}
}
