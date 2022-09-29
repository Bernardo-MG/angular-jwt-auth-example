import { Component } from '@angular/core';
import { MenuLink } from './navigation/model/menu-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-http-basic-auth-example';

  links: MenuLink[] = [{ name: 'login', path: '/login' },{ name: 'data', path: '/data' }];

}
