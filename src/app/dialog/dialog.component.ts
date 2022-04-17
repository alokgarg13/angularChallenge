import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent  {

  constructor(
    public router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  closeDialog(redirectPath: string) {
    this.dialog.closeAll();
    setTimeout(()=> {
      this.router.navigate([redirectPath]);
    }, 500);
  }

}
