import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { SidebarComponent } from './sidebar/sidebar';
import { SidebarItemComponent } from './sidebar-item/sidebar-item';
import { SwitcherComponent } from './switcher/switcher';
import { ExpandableComponent } from './expandable/expandable';
import { DateInputComponent } from './date-input/date-input';

@NgModule({
	declarations: [SidebarComponent,
    SidebarItemComponent,
    SwitcherComponent,
    ExpandableComponent,
    DateInputComponent],
	imports: [IonicModule],
	exports: [SidebarComponent,
    SidebarItemComponent,
    SwitcherComponent,
    ExpandableComponent,
    DateInputComponent]
})
export class ComponentsModule {}
