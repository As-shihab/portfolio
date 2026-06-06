import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAdmin } from './blog-admin';

describe('BlogAdmin', () => {
  let component: BlogAdmin;
  let fixture: ComponentFixture<BlogAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
