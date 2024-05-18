import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HomeService {
  constructor(protected http: HttpService) {}

  public getHomeInfo(page: string) {
    return this.http
      .doGet(`${environment.endpoint}/${page}`)
      .pipe(map((response: any) => response));
  }
}
