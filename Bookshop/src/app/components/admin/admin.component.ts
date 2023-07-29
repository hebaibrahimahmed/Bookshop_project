import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/authentication/auth.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  userFromAdmin!: User
  
  constructor(private _UserService: AuthService) {
    this.userFromAdmin = this._UserService.currentLogUser.value;
  }
}
