import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationsPageComponent } from './installations-page.component';

describe('InstallationsPageComponent', () => {
  let component: InstallationsPageComponent;
  let fixture: ComponentFixture<InstallationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallationsPageComponent]
    });
    fixture = TestBed.createComponent(InstallationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
