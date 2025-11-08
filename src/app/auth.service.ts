import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Credential shape used by the component
export interface credential {
  username: string;
  password: string;
}

// Response shape expected by the component
export interface Item {
  response_pose: number;
  response_desc: string;
  // allow additional fields from backend
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class userBox {
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<Item> {
    return this.http.post<Item>('/api/login', { username, password });
  }
}
