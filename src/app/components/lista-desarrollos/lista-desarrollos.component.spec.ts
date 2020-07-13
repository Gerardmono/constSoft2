import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDesarrollosComponent } from './lista-desarrollos.component';

describe('ListaDesarrollosComponent', () => {
  let component: ListaDesarrollosComponent;
  let fixture: ComponentFixture<ListaDesarrollosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDesarrollosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDesarrollosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
