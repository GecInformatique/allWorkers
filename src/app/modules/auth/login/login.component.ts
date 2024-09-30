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
  errorMessage !: string  ;

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
    this.showProgressBar = true;
    this.errorMessage = '';  // Réinitialiser l'erreur avant chaque tentative

    const body = {
      email: this.email,
      password: this.password
    };

    this.authService.login(body).subscribe(
      (response: any) => {
        if (response && response.access_token) {
          this.localTokenService.setToken(response.access_token);
          this.authService.user().subscribe(
            (userData: any) => {
              this.localAuthService.setCurrentUser(userData);
              this.showProgressBar = false;
              this.router.navigate(['/home']);
            },
            (error: any) => {
            }
          );
        } else {
          this.showProgressBar = false;
          this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos informations.';
        }
      },
      (error: any) => {
        this.showProgressBar = false;
        this.errorMessage = 'Email ou mot de passe incorrect. Veuillez réessayer.';
      }
    );
  }


  logout(): void {
    this.localAuthService.removeCurrentUser();
    this.localTokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
