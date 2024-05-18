import { Component, Input } from '@angular/core';
import { Info } from '@home/model/home-info.interface';

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.css'],
})
export class HomeInfoComponent {
  @Input({ required: true }) infoText!: Info;
}
