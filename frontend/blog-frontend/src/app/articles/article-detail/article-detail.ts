import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArticleService } from '../article';
import { AuthService } from '../../auth/auth';
import { CommentListComponent } from '../../comments/comment-list/comment-list';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CommentListComponent],
  templateUrl: './article-detail.html',
  styleUrls: ['./article-detail.css']
})
export class ArticleDetailComponent implements OnInit {
  article: any;          // 👈 we use "any" since no model file yet
  articleId!: string;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id')!;
    this.loadArticle();
  }

  loadArticle() {
    this.loading = true;
    this.articleService.getById(this.articleId).subscribe({
      next: (res: any) => {
        this.article = res;
        console.log('Loaded article:', this.article);
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading article:', err);
        this.errorMessage = 'Failed to load article.';
        this.loading = false;
      }
    });
  }

  goToAddComment() {
    this.router.navigate(['/articles', this.articleId, 'comments', 'new']);
  }

  goBack() {
    this.router.navigate(['/articles']);
  }
}
