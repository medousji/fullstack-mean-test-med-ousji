import { Component } from '@angular/core';
import { ArticleService } from '../article';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-create.component.html'
})
export class ArticleCreateComponent {
  title = '';
  content = '';
  tags = '';

  constructor(private articleService: ArticleService, private router: Router) { }

  save() {
    const tagList = this.tags.split(',').map((t) => t.trim());
    this.articleService.create({ title: this.title, content: this.content, tags: tagList })
      .subscribe({
        next: () => this.router.navigate(['/articles']),
        error: (err) => alert(err.error.message)
      });
  }
}
