import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private mockCertificates: Certificate[] = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Dec 2023',
      credentialUrl: 'https://aws.amazon.com/certification/',
      imageUrl: 'https://placehold.co/100x100/FF9900/white?text=AWS'
    },
    {
      id: 2,
      title: 'Docker Certified Associate',
      issuer: 'Docker Inc.',
      date: 'Oct 2023',
      credentialUrl: 'https://www.docker.com/certification/',
      imageUrl: 'https://placehold.co/100x100/2496ED/white?text=Docker'
    },
    {
      id: 3,
      title: 'Meta Front-End Developer',
      issuer: 'Meta',
      date: 'Sep 2023',
      credentialUrl: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
      imageUrl: 'https://placehold.co/100x100/1877F2/white?text=Meta'
    },
    {
      id: 4,
      title: 'Microsoft Certified: Azure Developer Associate',
      issuer: 'Microsoft',
      date: 'Aug 2023',
      credentialUrl: 'https://learn.microsoft.com',
      imageUrl: 'https://placehold.co/100x100/0078D4/white?text=Azure'
    },
    {
      id: 5,
      title: 'Google Professional Cloud Architect',
      issuer: 'Google Cloud',
      date: 'May 2022',
      credentialUrl: 'https://cloud.google.com',
      imageUrl: 'https://placehold.co/100x100/4285F4/white?text=GCP'
    },
    {
      id: 6,
      title: 'Angular Certified Developer',
      issuer: 'Angular Training',
      date: 'Jan 2021',
      credentialUrl: 'https://angular.io',
      imageUrl: 'https://placehold.co/100x100/DD0031/white?text=Angular'
    }
  ];

  constructor() { }

  getCertificates(): Observable<Certificate[]> {
    return of(this.mockCertificates);
  }
}
