import { Component, Input } from '@angular/core';
import { Contact } from '@home/model/home-info.interface';

@Component({
  selector: 'app-home-contact-banner',
  templateUrl: './home-contact-banner.component.html',
  styleUrls: ['./home-contact-banner.component.css'],
})
export class HomeContactBannerComponent {
  @Input({ required: true }) contactInfo: Contact;
}
