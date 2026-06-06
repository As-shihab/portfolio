import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private apiService: ApiService, private router: Router) {
    // Check if user is already logged in
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  /**
   * Login user
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const loginData: LoginRequest = { username, password };
    
    return this.apiService.post<LoginResponse>('auth/login', loginData).pipe(
      tap(response => {
        // Store token in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('isLoggedIn', 'true');
        this.isLoggedIn = true;
      })
    );
  }

  /**
   * Register new user
   */
  register(username: string, email: string, password: string): Observable<RegisterResponse> {
    const registerData: RegisterRequest = { username, email, password };
    return this.apiService.post<RegisterResponse>('auth/register', registerData);
  }

  /**
   * Logout user
   */
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/admin/login']);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.isLoggedIn || !!localStorage.getItem('token');
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
