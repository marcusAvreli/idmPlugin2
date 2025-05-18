import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var PluginHelper: any;  
@Injectable()
export class CsrfTokenInterceptor implements HttpInterceptor {

	constructor() {
		console.log("csrf_token_interceptor");
	  
	}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//console.log("csrf_token_interceptor","intercept"+PluginHelper.getBasicAuth());
console.log("csrf_token_interceptor","intercept"+PluginHelper.getCsrfToken());
console.log("fffff:"+btoa("spadmin:admin"));
    // CSRF token for GET and HEAD is not needed
   // development hook  
      /*
            const authReq = request.clone({  
                headers: request.headers.set('Authorization', "Basic " + btoa("spadmin:admin"))  
            });  
            return next.handle(authReq);  
         */
   
        // Clone the request to add the new header.  
        const csrfReq = request.clone({  
		
            //headers: request.headers.set('X-XSRF-TOKEN', PluginHelper.getCsrfToken())  
			setHeaders : {
				'X-XSRF-TOKEN' : PluginHelper.getCsrfToken()
				 , Authorization: `Basic `+ btoa("spadmin:admin")
			},
        });  
   
        // Pass on the cloned request instead of the original request.  
        return next.handle(csrfReq);  
  }
}