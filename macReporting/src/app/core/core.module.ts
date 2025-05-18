import {ModuleWithProviders,NgModule, Optional, SkipSelf} from '@angular/core';
import {APP_INITIALIZER, ErrorHandler,Injectable,Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { IHttpConfig } from "./models/http-config.interface";
import { CsrfTokenInterceptor } from "./interceptors/csrf-token.interceptor";
import { propertiesResolverFactory } from "./properties-resolver.factory";
import {TaskService} from '../task/shared/task.service';
import {PtService} from '../provTransaction/shared/pt.service';
import {PtService2} from '../provTransaction2/shared/pt2.service';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from "./services/config.service";
@NgModule({
  imports: [
		CommonModule
		,HttpClientModule
	]
	,declarations: []
	
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
     console.log("==========rooot module==========");
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
  
  
 public static forRoot(config?: IHttpConfig): ModuleWithProviders<CoreModule> {
    return {
		ngModule: CoreModule
		,providers: [
				HttpClientModule,

				{ provide: HTTP_INTERCEPTORS, useClass: CsrfTokenInterceptor, multi: true },

				ConfigService
				,{provide: 'CONFIG', useValue: config}
				,{
					provide: APP_INITIALIZER
					,useFactory: propertiesResolverFactory
					,deps: [ ConfigService, [new Inject('CONFIG')]]
					,multi: true
				}
				,TaskService
				,PtService
				,PtService2
			]
		};
	}
}