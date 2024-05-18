import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { InstallationsPageComponent } from './pages/installations-page/installations-page.component';
import { HomeService } from './services/home-services.service';
import { HomeInfoComponent } from './components/home-info/home-info.component';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeContactBannerComponent } from './components/home-contact-banner/home-contact-banner.component';
import { SharedModule } from '@shared/shared.module';
import { ServiceCardComponent } from './components/service-card/service-card.component';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    ServicesPageComponent,
    InstallationsPageComponent,
    HomeInfoComponent,
    HomeHeroComponent,
    HomePageComponent,
    HomeContactBannerComponent,
    ServiceCardComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [HomeService],
})
export class HomeModule {}
