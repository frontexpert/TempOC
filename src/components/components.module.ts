import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { SidebarComponent } from './sidebar/sidebar';
import { SidebarItemComponent } from './sidebar-item/sidebar-item';
import { SwitcherComponent } from './switcher/switcher';

@NgModule({
	declarations: [SidebarComponent,
    SidebarItemComponent,
    SwitcherComponent],
	imports: [IonicModule],
	exports: [SidebarComponent,
    SidebarItemComponent,
    SwitcherComponent]
})
export class ComponentsModule {}
