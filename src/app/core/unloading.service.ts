import { ApplicationHttpClient } from './http-client';
/* import { SocetService } from './../PushServices/socet.service'; */
import { Injectable } from '@angular/core';
import { AppMemoryService } from './app-memory.service';

@Injectable()
export class UnloadingService {
  constructor(
    protected http: ApplicationHttpClient,
    /* private socetService: SocetService, */
    public appMemory: AppMemoryService
  ) {}

  public exportAsFile(url: string, query: any) {
    const sub = this.http.Get(url, query);
    sub.subscribe(
      res => {
        this.appMemory.openSimpleSnackbar(
          'Отчет в процессе генерации, скачка файла начнется автоматически.'
        );
      },
      err => {
        this.appMemory.openSimpleSnackbar(err.statusText);
      }
    );
    return sub;
  }

  /*   subscribeUrlPush() {
    this.socetService.UserPush().subscribe((data: any) => {
      if (data.data && data.data.export && data.data.src) {
        const link = document.createElement('a');
        link.href = data.data.src;
        link.download = 'fole.' + data.data.export;
        link.dispatchEvent(new MouseEvent('click'));
        link.remove();
      }
    });
  } */
}
