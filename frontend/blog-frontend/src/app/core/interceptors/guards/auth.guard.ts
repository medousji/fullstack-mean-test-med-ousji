import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth';

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    // ✅ user logged in
    if (auth.hasToken()) {
        return true;
    }
    else {
        router.navigate(['/login']);
        return false;
    }
};
