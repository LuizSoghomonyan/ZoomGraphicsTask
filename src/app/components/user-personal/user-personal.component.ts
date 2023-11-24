import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router, RouterModule, UrlSegment} from "@angular/router";
import {concatMap, iif, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {UserAddress, UserCreditCard, UserData, UserEmployment, UserSubscription} from "../../models/user-data";
import {MatCardModule} from "@angular/material/card";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-user-personal',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, FormsModule,
    MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
  providers: [UserService],
  templateUrl: './user-personal.component.html',
  styleUrl: './user-personal.component.scss'
})
export class UserPersonalComponent implements OnInit{
  public isReady: boolean = false;
  public userData!: UserData;
  public form!: FormGroup;


  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.route.url
      .pipe(
        switchMap((url: UrlSegment[]) => {
          let userid: number = Number(url[2].path);
          return this.userService.getUserById(userid)
        }),
        map((userData: UserData | undefined) => {
          if(!userData){
            this.router.navigate(['/page-not-found'])
            return undefined
          }
          else {
            this.userData = userData;
            return userData;
          }
        }),
        map((userData: UserData | undefined) => {
          if(userData){
            this.initFormGroup(userData)
          }

        })
      )
      .subscribe(() => {
        this.isReady = true;
      }, console.error);
  }


  private initFormGroup(userData: UserData) {
    this.form = new FormGroup({
      username: new FormControl<string>(this.userData.username,
        [Validators.required]),
      email: new FormControl<string>(this.userData.email,
        [Validators.required, Validators.email]),
      gender: new FormControl<string>(this.userData.gender),
      phone_number: new FormControl<string>(this.userData.phone_number),
      social_insurance_number: new FormControl<string>(this.userData.social_insurance_number),
      date_of_birth: new FormControl<Date>(this.userData.date_of_birth,[Validators.required]),
      employment_title: new FormControl<string>(this.userData.employment.title),
      employment_key_skill: new FormControl<string>(this.userData.employment.key_skill),
      address_city: new FormControl<string>(this.userData.address.city),
      address_street_name: new FormControl<string>(this.userData.address.street_name),
      address_street_address: new FormControl<string>(this.userData.address.street_address),
      address_zip_code: new FormControl<string>(this.userData.address.zip_code),
      address_state: new FormControl<string>(this.userData.address.state),
      address_country: new FormControl<string>(this.userData.address.country)
    })
  }

  public onSubmit() {
    console.log('Updated User Data', this.form.value);
  }
}
