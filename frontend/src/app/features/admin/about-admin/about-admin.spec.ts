import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAdmin } from './about-admin';

describe('AboutAdmin', () => {
  let component: AboutAdmin;
  let fixture: ComponentFixture<AboutAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
