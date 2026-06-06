import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAdmin } from './portfolio-admin';

describe('PortfolioAdmin', () => {
  let component: PortfolioAdmin;
  let fixture: ComponentFixture<PortfolioAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
