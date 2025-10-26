import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ArticleService } from '../article';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];

  editingArticleId: string | null = null;
  editTitle = '';
  editContent = '';

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getAll().subscribe({
      next: (res: any) => (this.articles = res),
      error: err => console.error(err)
    });
  }

  startEdit(article: any) {
    this.editingArticleId = article._id;
    this.editTitle = article.title;
    this.editContent = article.content;
  }

  cancelEdit() {
    this.editingArticleId = null;
    this.editTitle = '';
    this.editContent = '';
  }

  saveEdit(article: any) {
    const updated = { title: this.editTitle, content: this.editContent };

    this.articleService.update(article._id, updated).subscribe({
      next: () => {
        Swal.fire('Updated!', 'The article has been updated successfully.', 'success');
        const index = this.articles.findIndex(a => a._id === article._id);
        if (index !== -1) this.articles[index] = { ...article, ...updated };
        this.cancelEdit();
      },
      error: err => {
        Swal.fire('Error', err.error?.message || 'Could not update article.', 'error');
      }
    });
  }

  confirmDelete(id: string) {
    Swal.fire({
      title: 'Delete this article?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.deleteArticle(id);
      }
    });
  }

  deleteArticle(id: string) {
    this.articleService.delete(id).subscribe({
      next: () => {
        Swal.fire('Deleted!', 'The article has been removed.', 'success');
        this.articles = this.articles.filter(a => a._id !== id);
      },
      error: err => {
        Swal.fire('Error', err.error?.message || 'Could not delete article.', 'error');
      }
    });
  }
}
