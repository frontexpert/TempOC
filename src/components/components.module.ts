import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { SidebarComponent } from './sidebar/sidebar';
import { SidebarItemComponent } from './sidebar-item/sidebar-item';
import { SwitcherComponent } from './switcher/switcher';
import { ExpandableComponent } from './expandable/expandable';

@NgModule({
	declarations: [SidebarComponent,
    SidebarItemComponent,
    SwitcherComponent,
    ExpandableComponent],
	imports: [IonicModule],
	exports: [SidebarComponent,
    SidebarItemComponent,
    SwitcherComponent,
    ExpandableComponent]
})
export class ComponentsModule {}
