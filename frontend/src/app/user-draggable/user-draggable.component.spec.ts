import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDraggableComponent } from './user-draggable.component';

describe('UserDraggableComponent', () => {
  let component: UserDraggableComponent;
  let fixture: ComponentFixture<UserDraggableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDraggableComponent]
    });
    fixture = TestBed.createComponent(UserDraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
