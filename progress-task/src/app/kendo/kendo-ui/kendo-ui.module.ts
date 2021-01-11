import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LabelModule } from '@progress/kendo-angular-label';

const kendoComponents = [
GridModule,
DropDownsModule,
InputsModule,
DialogsModule,
LabelModule,
GridModule,
]

@NgModule({
  
  imports: [kendoComponents],
  exports:[kendoComponents],
})
export class KendoUiModule { }
