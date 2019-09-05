import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutoComponent } from './admin-tuto.component';

describe('AdminTutoComponent', () => {
  let component: AdminTutoComponent;
  let fixture: ComponentFixture<AdminTutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
