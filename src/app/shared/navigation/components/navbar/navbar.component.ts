import { Component, Input } from '@angular/core';
import { MenuLink } from '../../model/menu-link';

@Component({
  selector: 'view-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() public title = '';

  @Input() public loggedIn = false;

  @Input() public links: MenuLink[] = [];

}
