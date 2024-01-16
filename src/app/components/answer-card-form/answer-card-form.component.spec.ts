import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerCardFormComponent } from './answer-card-form.component';

describe('AnswerCardFormComponent', () => {
  let component: AnswerCardFormComponent;
  let fixture: ComponentFixture<AnswerCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerCardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
