import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  getItems<T>(apiEndpoint: string): Observable<T[]> {
    return this.http.get<T[]>(apiEndpoint);
  }

  addItem<T>(apiEndpoint: string, item: T): Observable<T> {
    return this.http.post<T>(apiEndpoint, item);
  }

  updateItem<T>(apiEndpoint: string, id: number, item: T): Observable<T> {
    return this.http.put<T>(`${apiEndpoint}/${id}`, item);
  }

  deleteItem<T>(apiEndpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${apiEndpoint}/${id}`);
  }
}
