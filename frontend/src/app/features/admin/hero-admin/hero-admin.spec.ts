import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAdmin } from './hero-admin';

describe('HeroAdmin', () => {
  let component: HeroAdmin;
  let fixture: ComponentFixture<HeroAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
