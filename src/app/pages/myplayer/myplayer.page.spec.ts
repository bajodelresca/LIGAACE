import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyplayerPage } from './myplayer.page';

describe('MyplayerPage', () => {
  let component: MyplayerPage;
  let fixture: ComponentFixture<MyplayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyplayerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyplayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
