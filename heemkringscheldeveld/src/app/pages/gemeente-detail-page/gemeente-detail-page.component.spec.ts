import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GemeenteDetailPageComponent } from './gemeente-detail-page.component';

describe('GemeenteDetailPageComponent', () => {
  let component: GemeenteDetailPageComponent;
  let fixture: ComponentFixture<GemeenteDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GemeenteDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GemeenteDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
