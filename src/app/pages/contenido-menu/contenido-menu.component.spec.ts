import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoMenuComponent } from './contenido-menu.component';

describe('ContenidoMenuComponent', () => {
  let component: ContenidoMenuComponent;
  let fixture: ComponentFixture<ContenidoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
