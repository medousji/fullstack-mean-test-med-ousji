import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:4000/api/comments';

  constructor(private http: HttpClient) {}

  getAll(articleId?: string): Observable<any[]> {
    const url = articleId ? `${this.apiUrl}?article=${articleId}` : this.apiUrl;
    return this.http.get<any[]>(url);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addComment(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<any>(this.apiUrl, data, { headers });
  }

  updateComment(id: string, data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers });
  }

  deleteComment(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
