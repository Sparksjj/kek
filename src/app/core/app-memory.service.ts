import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AppMemoryService {
  constructor(private snackBar: MatSnackBar) {}

  openSimpleSnackbar(text = 'Готово', action = 'Закрыть', duration = 4000) {
    this.snackBar.open(text, action, {
      duration: duration
    });
  }
}
