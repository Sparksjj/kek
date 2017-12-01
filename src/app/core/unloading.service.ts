import { SocketService } from './socket.service';
import { ApplicationHttpClient } from './http-client';
import { Injectable } from '@angular/core';
import { AppMemoryService } from './app-memory.service';

@Injectable()
export class UnloadingService {
  constructor(
    protected http: ApplicationHttpClient,
    private socketService: SocketService,
    public appMemory: AppMemoryService
  ) {}

  public exportAsFile(url: string, query: any) {
    return this.http
      .Get(url, { params: query })
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
