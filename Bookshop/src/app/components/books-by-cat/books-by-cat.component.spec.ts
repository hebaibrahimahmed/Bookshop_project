import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksByCatComponent } from './books-by-cat.component';

describe('BooksByCatComponent', () => {
  let component: BooksByCatComponent;
  let fixture: ComponentFixture<BooksByCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksByCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
