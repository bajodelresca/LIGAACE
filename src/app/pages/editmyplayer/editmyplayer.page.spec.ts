import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditmyplayerPage } from './editmyplayer.page';

describe('EditmyplayerPage', () => {
  let component: EditmyplayerPage;
  let fixture: ComponentFixture<EditmyplayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmyplayerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditmyplayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
