import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './pages/item/item.component';
import { OrderComponent } from './pages/order/order.component';
import { ClientComponent } from './pages/client/client.component';

const routes: Routes = [
  {
    path:'item',
    component: ItemComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },{
    path: 'client',
    component: ClientComponent
  },
  {
    path: '',
    redirectTo: '/order',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/order'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
