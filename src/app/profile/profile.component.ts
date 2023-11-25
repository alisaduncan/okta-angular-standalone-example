import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { Observable, filter, map, take, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-card">
    <div class="shield"></div>
    <p>You're logged in!
      <span *ngIf="name$ | async as name">
        Welcome, {{name}}
      </span>
    </p>
  </div>
  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public name$!: Observable<string>;
  private oktaAuthStateService = inject(OktaAuthStateService);

  public ngOnInit(): void {
    this.name$ = this.oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
  }
}
