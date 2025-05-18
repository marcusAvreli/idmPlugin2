import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CoreModule} from './core/core.module';
import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UIElementsModule} from './ui-elements/ui-elements.module';

import {EditPtComponent} from './provTransaction/containers/edit/edit.pt.component';
import {ProvTransactionComponent} from './provTransaction/components/list/provTransaction.component';

import {EditPtComponent2} from './provTransaction2/containers/edit/edit.pt2.component';
import {ProvTransactionComponent2} from './provTransaction2/components/list/provTransaction2.component';

import {EditTaskComponent} from './task/containers/edit/edit.task.component';
import {TaskComponent} from './task/components/list/task.component';

import { CONFIG } from "../app-config";
console.log("app_module");
@NgModule({
  declarations: [
    AppComponent
	,EditTaskComponent
	,TaskComponent
	,EditPtComponent
	,ProvTransactionComponent
	
	,EditPtComponent2
	,ProvTransactionComponent2
  ],
  imports: [
	BrowserModule	 
	, FormsModule
	,CommonModule
	, ReactiveFormsModule
	, CoreModule.forRoot(CONFIG)
	,  UIElementsModule
  ],
	providers: [],
	bootstrap: [AppComponent]
	,schemas: [CUSTOM_ELEMENTS_SCHEMA]
	,entryComponents :[
			EditTaskComponent
			,TaskComponent
			
		   ,EditPtComponent
		   ,ProvTransactionComponent
		   
		   ,EditPtComponent2
			,ProvTransactionComponent2
		]
})
export class AppModule { }
