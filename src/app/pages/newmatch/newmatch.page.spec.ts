import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewmatchPage } from './newmatch.page';

describe('NewmatchPage', () => {
  let component: NewmatchPage;
  let fixture: ComponentFixture<NewmatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewmatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
