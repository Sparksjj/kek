import { UnloadingService } from './core/unloading.service';
import { AppMemoryService } from './core/app-memory.service';
import { SocketService } from './core/socket.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { MediaReplayService } from './core/sidenav/mediareplay/media-replay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(
    public appMemory: AppMemoryService,
    private unloadingService: UnloadingService,
    private socket: SocketService,
    mediaReplayService: MediaReplayService
  ) {
    this.appMemory.userSubject.subscribe(res => {
      if (this.appMemory.user) {
        this.unloadingService.subscribeUrlPush();
      }
    });
  }
}
