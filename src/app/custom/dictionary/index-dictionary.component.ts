import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { AppMemoryService } from '../../core/app-memory.service';
import { ApplicationHttpClient } from '../../core/http-client';
import JSONEditor from 'jsoneditor';

@Component({
  selector: 'ms-dictionary',
  templateUrl: './index-dictionary.component.html',
  styleUrls: ['./index-dictionary.component.scss'],
})
export class IndexDictionaryComponent implements OnInit, OnDestroy {
  @ViewChild('translateInput') translateInput;
  public selected: string;
  public parsedJSON: string;
  public editor: JSONEditor;

  public error: string;
  public errorObj: any;
  public fileErr: any;
  public fileInvalid: any;
  public load = false;
  public langs = [];

  constructor(
    public http: ApplicationHttpClient,
    public activatedRoute: ActivatedRoute,
    public appMemory: AppMemoryService,
    public router: Router
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  public initJSONEditor(): void {
    if (this.editor) {
      this.editor.destroy();
    }

    const container = document.getElementById('jsoneditor');
    const options = { mode: 'tree' };

    this.editor = new (<any>window).JSONEditor(
      container,
      <any>options,
      JSON.parse(this.parsedJSON)
    );

    this.editor.expandAll();
    this.editor.focus();
  }

  public getItem(): void {
    setTimeout(() => {
      this.http.Get<any>(`admin/dictionary/${this.selected}`).subscribe(
        res => {
          if (!res) {
            if (this.editor) {
              this.editor.destroy();
            }
            return;
          }
          this.parsedJSON = JSON.stringify(res.json);

          this.initJSONEditor();
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  public saveItem(form: any) {
    this.error = undefined;
    this.errorObj = undefined;
    this.fileErr = false;

    if (form.invalid || this.fileInvalid) {
      return;
    }

    this.parsedJSON = JSON.stringify(this.editor.get(), null, 2);

    const body = {
      language: this.selected,
      json: this.parsedJSON,
    };

    console.log('BODY', body);

    this.load = true;
    this.http.Put(`admin/dictionary/${this.selected}`, body).subscribe(
      res => {
        this.load = false;
        this.appMemory.openSimpleSnackbar();
      },
      err => {
        if (err.status === 422) {
          this.errorObj = err.error.errors || { err: [err.error.error] };
        } else {
          this.error = 'Ошибка сервера, попробуйте перезагрузить страницу.';
        }
        this.load = false;
      }
    );
  }
}
