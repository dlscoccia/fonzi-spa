import { Component, OnInit } from '@angular/core';
import { HomeTexts } from '@home/model/home-info.interface';
import { HomeService } from '@home/services/home-services.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  infoText: HomeTexts;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getStaticInfo('home-texts');
  }

  getStaticInfo(page: string) {
    this.homeService.getHomeInfo(page).subscribe({
      next: (data) => (this.infoText = data),
      error: (error) => console.log(error),
    });
  }
}
