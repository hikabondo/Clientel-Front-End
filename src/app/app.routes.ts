import { Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';

export const routes: Routes = [

    {
        path: "", component : CustomerComponent
    },
    {
        path: "customer", component : CustomerComponent
    }
];
