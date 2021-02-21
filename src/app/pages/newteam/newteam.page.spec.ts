import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewteamPage } from './newteam.page';

describe('NewteamPage', () => {
  let component: NewteamPage;
  let fixture: ComponentFixture<NewteamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewteamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewteamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
