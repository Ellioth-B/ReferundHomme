import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActualiteComponent } from './admin-actualite.component';

describe('AdminActualiteComponent', () => {
  let component: AdminActualiteComponent;
  let fixture: ComponentFixture<AdminActualiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActualiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
