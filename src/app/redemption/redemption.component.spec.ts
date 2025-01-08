import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionComponent } from './redemption.component';

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture<RedemptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedemptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
