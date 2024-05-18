import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContactBannerComponent } from './home-contact-banner.component';

describe('HomeContactBannerComponent', () => {
  let component: HomeContactBannerComponent;
  let fixture: ComponentFixture<HomeContactBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeContactBannerComponent]
    });
    fixture = TestBed.createComponent(HomeContactBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
