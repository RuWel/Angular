import { Component } from '@angular/core';
import { TutorialComponent } from './tutorial/tutorial.component';
import { ModelModule } from './model/model.module';
import { Router } from '@angular/router';
import { NoCommaPipe } from './tutorial/pipes/nocomma.pipe';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [TutorialComponent, NoCommaPipe, NgIf]
})

export class AppComponent {
  title = 'Tutorials';
  serverAlive: boolean = false;

  private webSocket: WebSocket;
  private message: any = {};

  constructor(private router: Router) {
  }
  
  // route to the feature home page of the application
  ngOnInit() {
    this.checkServer();
  }

  private checkServer() {
    this.webSocket = new WebSocket('ws://localhost:8080/ticker');

    this.webSocket.addEventListener("error", (event) => {
      const myModal = document.getElementById('modalButton');
      myModal?.click();
    });

    this.webSocket.addEventListener("open", (event) => {
      this.serverAlive = true;
      this.router.navigate(['/tutorial']);
    });

    this.webSocket.addEventListener("close", (event) => {
      if (this.serverAlive) {
        window.location.reload();
      }

      this.serverAlive = false;
    });

    this.webSocket.onmessage = (event) => {
      this.message = JSON.parse(event.data)
      this.serverAlive = true;
    };    
  }

  checkServerAgain() {
    window.location.reload();
  }
}
