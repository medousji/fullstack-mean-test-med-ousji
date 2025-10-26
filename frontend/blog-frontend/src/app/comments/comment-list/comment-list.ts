import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../comment';
import { AuthService } from '../../auth/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-list.html',
  styleUrls: ['./comment-list.css']
})
export class CommentListComponent implements OnInit {
  @Input() articleId!: string;
  comments: any[] = [];
  newCommentText = '';
  editingCommentId: string | null = null;
  editingText = '';

  currentUsername: string | null = null; // Using username for ownership

  constructor(
    private commentService: CommentService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUsername = localStorage.getItem('username'); // get logged-in username
    console.log('Logged-in username:', this.currentUsername);
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getAll(this.articleId).subscribe({
      next: (res: any[]) => {
        this.comments = res;
        console.log('Loaded comments:', this.comments);
      },
      error: (err) => console.error('Error loading comments', err)
    });
  }

  addComment(): void {
    if (!this.newCommentText.trim()) return;

    const token = this.auth.getToken();
    if (!token) {
      Swal.fire('Login required', 'You must be logged in to comment.', 'info');
      return;
    }

    const data = { text: this.newCommentText, article: this.articleId };

    this.commentService.addComment(data, token).subscribe({
      next: (res) => {
        this.comments.push(res);
        this.newCommentText = '';
        Swal.fire('Added!', 'Your comment has been added.', 'success');
      },
      error: (err) => console.error('Error adding comment', err)
    });
  }

  startEdit(comment: any): void {
    this.editingCommentId = comment._id;
    this.editingText = comment.text;
  }

  saveEdit(comment: any): void {
    if (!this.editingText.trim()) return;
    const token = this.auth.getToken();
    if (!token) return;

    this.commentService.updateComment(comment._id, { text: this.editingText }, token).subscribe({
      next: (res) => {
        const index = this.comments.findIndex((c) => c._id === res._id);
        if (index !== -1) this.comments[index] = res;
        this.editingCommentId = null;
        this.editingText = '';
        Swal.fire('Updated!', 'Comment updated successfully.', 'success');
      },
      error: (err) => console.error('Error updating comment', err)
    });
  }

  cancelEdit(): void {
    this.editingCommentId = null;
    this.editingText = '';
  }

  confirmDelete(comment: any): void {
    Swal.fire({
      title: 'Delete comment?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) this.deleteComment(comment);
    });
  }

  deleteComment(comment: any): void {
    const token = this.auth.getToken();
    if (!token) return;

    this.commentService.deleteComment(comment._id, token).subscribe({
      next: () => {
        this.comments = this.comments.filter((c) => c._id !== comment._id);
        Swal.fire('Deleted!', 'Comment removed successfully.', 'success');
      },
      error: (err) => console.error('Error deleting comment', err)
    });
  }

  isCommentOwner(comment: any): boolean {
    // Compare the comment's author username with current logged-in username
    return !!comment.author?.username && comment.author.username === this.currentUsername;
  }

  isLoggedIn(): boolean {
    return this.auth.hasToken();
  }

  trackByCommentId(index: number, comment: any): string {
    return comment._id;
  }
}
