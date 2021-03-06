import { AppMemoryService } from './app-memory.service';
import { ApplicationHttpClient } from './http-client';
import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable()
export class UnloadingService {
  constructor(
    protected http: ApplicationHttpClient,
    private socketService: SocketService,
    public appMemory: AppMemoryService
  ) {}

  public exportAsFile(url: string, query: any) {
    const queryCopy = Object.assign({}, query);
    queryCopy.export = 'xls';

    return this.http
      .Get(url, { params: queryCopy })
      .toPromise()
      .then(
        res => {
          this.appMemory.openSimpleSnackbar(
            'Отчет в процессе генерации, скачка файла начнется автоматически.'
          );
        },
        err => {
          this.appMemory.openSimpleSnackbar(err.statusText);
        }
      );
  }

  public exportAsFilePost(url: string, query: any) {
    if (query.from) {
      query.from = query.from.toString();
    }

    if (query.to) {
      query.to = query.to.toString();
    }
    url += '/xls';
    return this.http
      .Post(url, query)
      .toPromise()
      .then(
        res => {
          this.appMemory.openSimpleSnackbar(
            'Отчет в процессе генерации, скачка файла начнется автоматически.'
          );
        },
        err => {
          this.appMemory.openSimpleSnackbar(err.statusText);
        }
      );
  }

  subscribeUrlPush() {
    this.socketService.UserPush().subscribe((data: any) => {
      if (data.data && data.data.export && data.data.src) {
        const link = document.createElement('a');
        link.href = data.data.src;
        link.download = 'fole.' + data.data.export;
        link.dispatchEvent(new MouseEvent('click'));
        link.remove();
      }
    });
  }
}
