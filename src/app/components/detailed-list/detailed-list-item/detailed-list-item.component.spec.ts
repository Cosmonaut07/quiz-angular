import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedListItemComponent } from './detailed-list-item.component';

describe('DetailedListItemComponent', () => {
  let component: DetailedListItemComponent;
  let fixture: ComponentFixture<DetailedListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
