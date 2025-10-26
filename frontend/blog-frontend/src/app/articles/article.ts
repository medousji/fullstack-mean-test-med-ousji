import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  private apiUrl = 'http://localhost:4000/api/articles';

  constructor(private http: HttpClient) { }



  getAll() { return this.http.get(this.apiUrl); }
  create(data: any) { return this.http.post(this.apiUrl, data); }
  update(id: string, data: any) { return this.http.put(`${this.apiUrl}/${id}`, data); }
  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
