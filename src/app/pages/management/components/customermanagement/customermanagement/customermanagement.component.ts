import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthenticationService, AlertService, ManagementService } from '../../../../../services/index';
import { BaMenuService } from '../../../../../theme';
import {CODE} from '../../../../../code/index';
import {CONSTANT} from '../../../../../constant/index';

@Component({
  selector: 'customermanagement',
  templateUrl: './customermanagement.html',
  styleUrls: ['./customermanagement.scss'],
})
export class CustomerManagement {

    public title: string;
    public settings;
    public source: LocalDataSource = new LocalDataSource();
    public hint;
    public companyId;
    public salerId;
    public saler;

    constructor(private managementService : ManagementService,
                private authenticationService: AuthenticationService,
                private menuService: BaMenuService, 
                private router: Router,
                private route: ActivatedRoute,
                private alertService: AlertService) {

        // set hint
        this.hint = CONSTANT.HINT.DATE_FORMAT;

        this.route.params.subscribe(params => {
            this.salerId = params['salerId']; // (+) converts string 'id' to a number
            this.saler = params['saler'];
        });

        // get menu
        this.menuService.updateMenuByRoutes(this.authenticationService.getMenu());

        // get saler detail setting
        this.settings = this.managementService.getCustomerManagementSetting();

        // set title
        this.title = CONSTANT.TITLE.CUSTOMER_MANAGEMENT_TABLE_TITLE;


        // get saler detail data
        this.getCustomerData();
    }

    getCustomerData(): void {
        // this.managementService.getCustomerData(this.salerId).subscribe(
        //     result => {
        //         if (result != null) {
        //             this.source.load(result);
        //         } else {
        //         }
        //     },
        //     error => {
        //         this.alertService.error(CODE.ERROR.BACKEND_ERROR,true);
        //         this.router.navigate(['/error'], {queryParams:{error: error}});
        //     }
        // );
    }

    onDeleteConfirm(event): void {
        if (window.confirm(CONSTANT.MESSAGE.DELETE_CONFIRM)) {
            event.confirm.resolve();
            // this.managementService.deleteCustomerData(event.data).subscribe(
            //     result => {
            //         if (result == true) {
            //             // delete succeeded
            //             event.confirm.resolve();
            //             this.alertService.info(CODE.INFO.DELETE_SUCCEEDED, true);
            //         } 
            //         else {
            //             // delete failed
            //             event.confirm.reject();
            //             this.alertService.warning(CODE.WARNING.DELETE_FAILED, true);
            //         }
            //     },
            //     error => {
            //         event.confirm.reject();
            //         this.alertService.error(CODE.ERROR.BACKEND_ERROR, true);
            //         this.router.navigate(['/error'], {queryParams:{error: error}});
            //     }
            // );
        }
    }

    onSaveConfirm(event): void {
        if (window.confirm(CONSTANT.MESSAGE.UPDATE_CONFIRM)) {
            event.confirm.resolve();
            // this.managementService.updateCustomerData(this.salerId, event.newData).subscribe(
            //     result => {
            //         if (result == true) {
            //             // delete succeeded
            //             event.confirm.resolve();
            //             this.alertService.info(CODE.INFO.SAVE_SUCCEEDED, true);
            //         } 
            //         else {
            //             // delete failed
            //             event.confirm.reject();
            //             this.alertService.warning(CODE.WARNING.SAVE_FAILED, true);
            //         }
            //     },
            //     error => {
            //         event.confirm.reject();
            //         this.alertService.error(CODE.ERROR.BACKEND_ERROR,true);
            //         this.router.navigate(['/error'], {queryParams:{error: error}});
            //     }
            // );
        }
    }

    onCreateConfirm(event): void {
        if (window.confirm(CONSTANT.MESSAGE.NEW_CONFIRM)) {
            event.confirm.resolve(event.newData);
            // this.managementService.newCustomerData(this.salerId, event.newData).subscribe(
            //     result => {
            //         if (result != null) {
            //             // delete succeeded
            //             event.newData["customerId"]=result;
            //             event.confirm.resolve(event.newData);
            //             this.alertService.info(CODE.INFO.CREATE_SUCCEEDED, true);
            //         } 
            //         else {
            //             // delete failed
            //             event.confirm.reject();
            //             this.alertService.warning(CODE.WARNING.CREATE_FAILED, true);
            //         }
            //     },
            //     error => {
            //         event.confirm.reject();
            //         this.alertService.error(CODE.ERROR.BACKEND_ERROR,true);
            //         this.router.navigate(['/error'], {queryParams:{error: error}});
            //     }
            // );
        }
    }
}
