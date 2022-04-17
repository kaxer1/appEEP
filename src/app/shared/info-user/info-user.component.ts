import { Component, OnInit } from '@angular/core';
import { DataCentralService } from '../../libs/data-central.service';
import { User } from '../../interfaces/user.iterface';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styles: [`
    #avatar {
      border-radius: 100%;
      height: 45px;
      width: 45px;
      background-color: rgb(126, 126, 126);
      margin-left: 10px;
      margin-top: 6px;
    }

    .iniciales {
      color: white;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 10px;
    }
  `]
})
export class InfoUserComponent {

  public get user(): User {
    return this.dcentral.user
  }

  constructor(
    private dcentral: DataCentralService
  ) { }

}
