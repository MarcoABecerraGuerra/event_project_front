import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

interface MenuItem {
  nombre: string;
  expanded?: boolean;
  subopciones: { nombre: string; ruta: string }[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];

  constructor(private _menuService: MenuService){}

  ngOnInit(): void {
    this.menuItems = this._menuService.getMenuOptions();
  }

  /*menuItems: MenuItem[] = [
    {
      nombre: 'Opción 1',
      expanded: false,
      subopciones: [
        { nombre: 'Subopción 1-1', ruta: '/ruta1' },
        { nombre: 'Subopción 1-2', ruta: '/ruta2' },
      ],
    },
    {
      nombre: 'Opción 2',
      expanded: false,
      subopciones: [
        { nombre: 'Subopción 2-1', ruta: '/ruta3' },
        { nombre: 'Subopción 2-2', ruta: '/ruta4' },
      ],
    },
  ];*/

  toggleMenu(index: number): void {
    // Cerrar todos los menús excepto el seleccionado
    this.menuItems.forEach((menu, i) => {
      if (i === index) {
        menu.expanded = !menu.expanded;
      } else {
        menu.expanded = false;
      }
    });
  }

}
