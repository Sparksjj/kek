import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { AppMemoryService } from '../../core/app-memory.service';
import { ApplicationHttpClient } from '../../core/http-client';
import JSONEditor from 'jsoneditor';

@Component({
  selector: 'ms-dictionary',
  templateUrl: './index-dictionary.component.html',
  styleUrls: ['./index-dictionary.component.scss']
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
  public langs = ['ru', 'en', 'cn', 'es', 'vn', 'kp'];

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
    const options = { mode: 'form' };
    this.editor = new JSONEditor(
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
          this.parsedJSON = JSON.stringify(res);
          this.initJSONEditor();
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  // public changeListner(event): void {
  //   this.errorObj = undefined;
  //   this.fileErr = false;
  //   this.fileInvalid = false;
  //
  //   const reader = new FileReader();
  //   let obj;
  //
  //   reader.onload = () => {
  //     try {
  //       obj = JSON.parse(reader.result);
  //       this.parsedJSON = JSON.stringify(obj);
  //     } catch (e) {
  //       this.fileInvalid = true;
  //       this.parsedJSON = undefined;
  //       event.target.value = null;
  //     }
  //   };
  //
  //   reader.readAsText(this.translateInput.nativeElement.files[0]);
  // }

  public saveItem(form: any) {
    this.error = undefined;
    this.errorObj = undefined;
    this.fileErr = false;

    if (form.invalid || this.fileInvalid) {
      return;
    }

    // if (this.translateInput && !this.translateInput.nativeElement.files[0]) {
    //   this.fileErr = true;
    //   return;
    // }

    this.parsedJSON = JSON.stringify(this.editor.get(), null, 2);

    const body = {
      json: this.parsedJSON
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
        } else if (err.status === 413) {
          /*           this.contentLarge = true;
        this.load = false;
        setTimeout(() => {
          $('.main-container').scrollTop(10000);
        }, 100); */
        } else {
          this.error = 'Ошибка сервера, попробуйте перезагрузить страницу.';
        }
        this.load = false;
      }
    );
  }
}
