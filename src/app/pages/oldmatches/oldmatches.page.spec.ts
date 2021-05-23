import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OldmatchesPage } from './oldmatches.page';

describe('OldmatchesPage', () => {
  let component: OldmatchesPage;
  let fixture: ComponentFixture<OldmatchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldmatchesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OldmatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
