import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormpPage } from './formp.page';

describe('FormpPage', () => {
  let component: FormpPage;
  let fixture: ComponentFixture<FormpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
