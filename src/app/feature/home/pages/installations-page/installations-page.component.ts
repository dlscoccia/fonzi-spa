import { Component, OnInit } from '@angular/core';
import { Installation } from '@home/model/home-info.interface';
import { HomeService } from '@home/services/home-services.service';

@Component({
  selector: 'app-installations-page',
  templateUrl: './installations-page.component.html',
  styleUrls: ['./installations-page.component.css'],
})
export class InstallationsPageComponent implements OnInit {
  installationsText: Installation[];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getText('installations');
  }

  getText(page: string) {
    this.homeService.getHomeInfo(page).subscribe({
      next: (data) => (this.installationsText = data),
      error: (error) => console.log(error),
    });
  }
}
