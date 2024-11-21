import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoginPage: boolean = false;

  constructor(private router: Router) {}

  title = 'event_project_front';

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    });
  }
}
