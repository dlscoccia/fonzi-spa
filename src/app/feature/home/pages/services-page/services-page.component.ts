import { Component, OnInit } from '@angular/core';

import { Service } from '@home/model/home-info.interface';
import { HomeService } from '@home/services/home-services.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css'],
})
export class ServicesPageComponent implements OnInit {
  servicesText: Service[];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getInfo('services');
  }

  getInfo(page: string) {
    this.homeService.getHomeInfo(page).subscribe({
      next: (data) => (this.servicesText = data),
      error: (error) => console.log(error),
    });
  }
}
