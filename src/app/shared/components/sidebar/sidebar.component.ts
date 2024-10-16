import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  expanded?: boolean;
  subItems: { title: string; link: string }[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  menuItems: MenuItem[] = [
    {
      title: 'Opción 1',
      expanded: false,
      subItems: [
        { title: 'Subopción 1-1', link: '/ruta1' },
        { title: 'Subopción 1-2', link: '/ruta2' },
      ],
    },
    {
      title: 'Opción 2',
      expanded: false,
      subItems: [
        { title: 'Subopción 2-1', link: '/ruta3' },
        { title: 'Subopción 2-2', link: '/ruta4' },
      ],
    },
    // Agrega más opciones según sea necesario
  ];

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
