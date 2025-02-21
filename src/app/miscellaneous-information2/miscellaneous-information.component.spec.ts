import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousInformationComponent } from './miscellaneous-information.component';

describe('MiscellaneousInformationComponent', () => {
  let component: MiscellaneousInformationComponent;
  let fixture: ComponentFixture<MiscellaneousInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscellaneousInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiscellaneousInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
