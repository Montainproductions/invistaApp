import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup | any;
  errorMsg: string[] = [];
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required,])),
      password: new FormControl('', Validators.compose([Validators.required,])),
    })
  }

  validation_messages = {
    'username': [{ type: 'required', message: 'Ingresa el nombre de usuario'},],
    'password': [{ type: 'required', message: 'Ingresa su contraseña'},],
  }

  async login() {
    this.isSubmitted = true;
    if (!this.loginForm?.valid) return;
    await this.authenticationService.login(this.loginForm.value);
  }

}
