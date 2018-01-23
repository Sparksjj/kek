import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { AppMemoryService } from '../core/app-memory.service';
import { environment } from '../../environments/environment';
declare var Echo: any;

@Injectable()
export class SocketService {
  private url: string = environment.socketUrl;
  private port: string = environment.socketPort;
  private echo: any;
  private cahanel: any;

  constructor(
    public appMemory: AppMemoryService,
    private authService: AuthService
  ) {
    this.createSocet();
    authService.changeLoginSubject.subscribe((islogged: any) => {
      if (islogged) {
        this.createSocet();
      } else {
        this.DesroyUserListen();
      }
    });
  }

  createSocet() {
    this.echo = new Echo({
      broadcaster: 'socket.io',
      host: this.url + this.port,
      auth: {
        headers: {
          Authorization: 'Bearer ' + this.authService.getToken()
        }
      }
    });
  }

  UserPush() {
    const observable = new Observable((observer: any) => {
      if (this.appMemory.user) {
        this.cahanel = 'user.' + this.appMemory.user.id;
        this.echo.private(this.cahanel).listen(
          'UserPush',
          (data: any) => {
            observer.next(data);
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
      }
    });
    return observable;
  }
  updateSocet() {
    this.echo = new Echo({
      broadcaster: 'socket.io',
      host: this.url + this.port
    });
  }

  DesroyUserListen() {
    if (this.cahanel) {
      this.echo.leave(this.cahanel);
      this.echo.leave();
      this.updateSocet();
      this.cahanel = undefined;
    }
  }
}
