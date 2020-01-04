import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductControlPanelComponent } from './product-control-panel.component';

describe('ProductControlPanelComponent', () => {
  let component: ProductControlPanelComponent;
  let fixture: ComponentFixture<ProductControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
