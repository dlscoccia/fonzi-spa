import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shared-menu',
  templateUrl: './menu.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] | undefined;

  ngOnInit() {
    this.menuItems = [
      { label: 'Inicio', icon: 'pi pi-fw pi-home' },
      { label: 'Servicios', icon: 'pi pi-fw pi-calendar' },
      { label: 'Instalaciones', icon: 'pi pi-fw pi-pencil' },
      { label: 'Reservas', icon: 'pi pi-fw pi-file' },
    ];
  }
}
