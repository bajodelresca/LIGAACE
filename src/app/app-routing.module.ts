import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),canActivate:[AuthService]
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then( m => m.PlayerPageModule)
  },
  {
    path: 'team',
    loadChildren: () => import('./pages/team/team.module').then( m => m.TeamPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'formp',
    loadChildren: () => import('./pages/formp/formp.module').then( m => m.FormpPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'myplayer',
    loadChildren: () => import('./pages/myplayer/myplayer.module').then( m => m.MyplayerPageModule)
  },
  {
    path: 'newteam',
    loadChildren: () => import('./pages/newteam/newteam.module').then( m => m.NewteamPageModule)
  },
  {
    path: 'editmyplayer',
    loadChildren: () => import('./pages/editmyplayer/editmyplayer.module').then( m => m.EditmyplayerPageModule)
  },
  {
    path: 'newmatch',
    loadChildren: () => import('./pages/newmatch/newmatch.module').then( m => m.NewmatchPageModule)
  },
  {
    path: 'match',
    loadChildren: () => import('./pages/match/match.module').then( m => m.MatchPageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  },  {
    path: 'gamestats',
    loadChildren: () => import('./pages/gamestats/gamestats.module').then( m => m.GamestatsPageModule)
  },
  {
    path: 'teamcalendar',
    loadChildren: () => import('./pages/teamcalendar/teamcalendar.module').then( m => m.TeamcalendarPageModule)
  },
  {
    path: 'oldmatches',
    loadChildren: () => import('./pages/oldmatches/oldmatches.module').then( m => m.OldmatchesPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
