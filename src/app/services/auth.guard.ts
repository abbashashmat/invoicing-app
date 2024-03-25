import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate: CanActivateFn = async (route, state) => {
    const authenticated = this.authService.isAuthenticated();
    if (!authenticated) {
      await this.router.navigate(['/login']);
    }
    return authenticated;
  };
}
