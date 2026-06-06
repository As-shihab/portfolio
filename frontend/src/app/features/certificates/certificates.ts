import { Component, OnInit, signal } from '@angular/core';
import { Certificate, CertificateService } from '../../core/services/certificate';

@Component({
  selector: 'app-certificates',
  imports: [],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css',
})
export class CertificatesComponent implements OnInit {
  certificates = signal<Certificate[]>([]);

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.certificateService.getCertificates().subscribe({
      next: (data) => this.certificates.set(data),
      error: (err) => console.error('Failed to load certificates', err)
    });
  }
}
