import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeamcalendarPage } from './teamcalendar.page';

describe('TeamcalendarPage', () => {
  let component: TeamcalendarPage;
  let fixture: ComponentFixture<TeamcalendarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamcalendarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamcalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
