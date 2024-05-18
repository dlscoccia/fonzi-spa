import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Banner, Hero } from '@home/model/home-info.interface';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.css'],
})
export class HomeHeroComponent {
  @Input({ required: true }) heroInfo: Hero;
  @Input({ required: true }) heroBanner: Banner;

  closeBanner = false;

  private router = inject(Router);

  handleCloseBanner() {
    this.closeBanner = true;
  }

  handleActionButton() {
    this.router.navigateByUrl('/inicio/servicios');
  }
}
