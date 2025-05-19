import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from '../../core/services/config.service'
import { BaseService } from '../../core/services/base.service';
import { CommonUtil } from '../../core/utilities/common.util';

@Injectable()
export class PtService2 extends BaseService<PtService2> {
	constructor(public override  http: HttpClient, @Inject('CONFIG') private config: ConfigService) { super(http); }

	public getServiceUrl(): string {
		return CommonUtil.getApiUrl('PROVISIONING_TRANSACTION_URL2', this.config);
	}
}
