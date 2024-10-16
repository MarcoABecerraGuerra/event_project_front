import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/common/sidebar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  sidebarVisible: boolean = true;

  constructor(private _sidebarService: SidebarService){

  }

  ngOnInit(): void {

  }

}
