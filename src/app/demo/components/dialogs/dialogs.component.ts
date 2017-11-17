import { Component } from '@angular/core';
import { routeAnimation } from "../../../route.animation";
import * as _ from 'lodash';
import { MatDialogRef, MatDialog } from "@angular/material";

@Component({
  selector: 'ms-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]
})
export class DialogsComponent {

  dialogRef: MatDialogRef<DemoDialog>;
  result: string;

  dialogHTML: string = `
  <button md-raised-button type="button" (click)="openDialog()" color="primary">Open Dialog</button>
  <p *ngIf="result">You chose: {{ result }}</p>
  `;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialogRef = this.dialog.open(DemoDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.result = result;
      this.dialogRef = null;
    });
  }

  getEscaped(text: string) {
    return _.escape(text);
  }

}

@Component({
  selector: 'ms-demo-dialog',
  template: `
  <h1>Would you like to order pizza?</h1>

  <mat-dialog-actions align="end">
    <button mat-button (click)="dialogRef.close('No!')">No</button>
    <button mat-button color="primary" (click)="dialogRef.close('Yes!')">Yes</button>
  </mat-dialog-actions>
  `
})
export class DemoDialog {
  constructor(public dialogRef: MatDialogRef<DemoDialog>) { }
}
