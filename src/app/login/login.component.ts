import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../login';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: ILogin = { userid: 'admin', password: 'admin123' };
  loginForm: FormGroup;
  message: string;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/dashboard';
    this.authService.logout();
  }

  get formControls() { return this.loginForm.controls; }

  login() {
    if (this.loginForm.invalid) {
      this.message = 'Usuário e senha são informações obrigatórias.';
    } else if (this.formControls.userid.value === this.model.userid && this.formControls.password.value === this.model.password) {
        console.log('Login successful');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.formControls.userid.value);
        this.router.navigate([this.returnUrl]);
    } else {
      this.message = 'Usuário ou senha inválidos.';
    }
  }
}
