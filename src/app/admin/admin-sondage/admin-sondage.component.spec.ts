import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSondageComponent } from './admin-sondage.component';

describe('AdminSondageComponent', () => {
  let component: AdminSondageComponent;
  let fixture: ComponentFixture<AdminSondageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSondageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
