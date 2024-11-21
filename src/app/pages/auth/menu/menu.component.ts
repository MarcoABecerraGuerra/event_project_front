import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/common/sidebar.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  sidebarVisible: boolean = true;

  constructor(private _sidebarService: SidebarService,
    private _menuService: MenuService
  ){
  }

  ngOnInit(): void {
    this.obtenerMenu();
  }

  obtenerMenu() {
    let menuOptions = null;
    menuOptions = localStorage.getItem('menu');
    if (menuOptions !== null) {
      const parsedMenuOptions = JSON.parse(menuOptions);
      this._menuService.setMenuOptions(JSON.parse(menuOptions));
      console.log(parsedMenuOptions); // Ahora puedes usar el objeto parseado
    } else {
      console.log('No hay datos guardados en localStorage para "menu"');
    }
  }

}
