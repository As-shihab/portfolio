import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'https://localhost:7085/api/contact';

  constructor(private http: HttpClient) { }

  sendMessage(message: ContactMessage): Observable<any> {
    return this.http.post(this.apiUrl, message);
  }
}
