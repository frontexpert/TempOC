import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { SidebarComponent } from './sidebar/sidebar';
import { SidebarItemComponent } from './sidebar-item/sidebar-item';

@NgModule({
	declarations: [SidebarComponent,
    SidebarItemComponent],
	imports: [IonicModule],
	exports: [SidebarComponent,
    SidebarItemComponent]
})
export class ComponentsModule {}
