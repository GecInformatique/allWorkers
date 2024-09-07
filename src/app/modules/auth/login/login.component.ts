import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {AuthService} from "../../../core/libs/scripts/libs/all-workers-api";
import {Router} from "@angular/router";
import { routes } from 'src/app/core/helpers/routes/routes';
import {LocalAuthService} from "../../../core/data/local/local.auth.service";
import {LocalTokenService} from "../../../core/data/local/local.token.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //public password: boolean[] = [true];
  public routes = routes
  public Toggledata = true;
  email !: string  ;
  password !: string  ;

  public showProgressBar = false;

  public CustomControler: unknown;
 // public subscription: Subscription;



  constructor(
   // private storage: WebStorage,
    private authService : AuthService,
   private localAuthService: LocalAuthService,
   private localTokenService: LocalTokenService,
    private router: Router,
  ) {
  }
  ngOnInit() {

  }



  public togglePassword(index: number) {
    // this.password[index] = !this.password[index];
  }

  /*login() {
    console.log(this.email, this.password)
    const body = {
      email: this.email,
      password : this.password
    }
    this.authService.login(body).subscribe(
      (response) => {
        //localStorage.setItem('token', response.token);
        localStorage.setItem('authenticated', 'true');
        this.router.navigate([routes.admin_dashboard]);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }*/

  login(): void {
    this.showProgressBar = true
    console.log(this.email, this.password);
    const body = {
      email: this.email,
      password: this.password
    };

    this.authService.login(body).subscribe(
      (response: any) => {
        if (response && response.access_token) {
          // Save the token and user details to local storage

          this.localTokenService.setToken(response.access_token);

          // Call the user method to get user details after successful login
          this.authService.user().subscribe(
            (userData: any) => {
              // Optionally save or use user data here
              console.log('User data:', userData);
              this.localAuthService.setCurrentUser(userData);
              this.showProgressBar = false
              this.router.navigate(['/home']); // Navigate to the dashboard or another route
            },
            (error: any) => {
              console.error('Error fetching user data:', error);
              // Handle error as needed
            }
          );
        } else {
          console.error('Login response does not contain a valid token');
          // Handle the case where token is missing
        }
      },
      (error: any) => {
        console.error('Login failed', error);
        // Handle login failure
      }
    );
  }


  logout(): void {
    this.localAuthService.removeCurrentUser();
    this.localTokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
