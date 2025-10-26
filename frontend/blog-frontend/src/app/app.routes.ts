import { Routes } from '@angular/router';

// import every standalone component you want to route to
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ArticleListComponent } from './articles/article-list/article-list.component.';
import { ArticleCreateComponent } from './articles/article-create/article-create.component';
import { authGuard } from './core/interceptors/guards/auth.guard'; // optional if you already created it
import { CommentListComponent } from './comments/comment-list/comment-list';
import { ArticleDetailComponent } from './articles/article-detail/article-detail';

export const routes: Routes = [
    { path: '', redirectTo: 'articles', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'articles', component: ArticleListComponent, title: 'Articles' },
    { path: 'articles/new', component: ArticleCreateComponent, title: 'Create Article', canActivate: [authGuard] },
    { path: 'articles/:id', component: ArticleDetailComponent, title: 'Article Details' },
    { path: '**', redirectTo: 'articles' },// fallback for undefined routes
    { path: 'comments', component: CommentListComponent, title: 'Comments' }
];
