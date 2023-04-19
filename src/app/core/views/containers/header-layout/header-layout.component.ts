import { Component } from '@angular/core';
import { SecurityContainer } from '@app/core/authentication/services/security-container.service';
import { MenuLink } from '@app/shared/navigation/model/menu-link';

@Component({
  selector: 'view-header-layout',
  templateUrl: './header-layout.component.html'
})
export class HeaderLayoutComponent {

  public title = 'Angular HTTP Basic Authentication Example';

  public links: MenuLink[] = [{ name: 'login', path: '/login' }, { name: 'data', path: '/data' }];

  public loggedIn = false;

  constructor(
    private securityContainer: SecurityContainer
  ) {
    this.securityContainer.getStatusObservable().subscribe(u => { this.loggedIn = u.logged });
  }

}
