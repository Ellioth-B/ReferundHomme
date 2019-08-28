import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccueilComponent } from './admin-accueil.component';

describe('AdminAccueilComponent', () => {
  let component: AdminAccueilComponent;
  let fixture: ComponentFixture<AdminAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
