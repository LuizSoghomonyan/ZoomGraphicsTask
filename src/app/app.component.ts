import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe, MatSlideToggleModule, ReactiveFormsModule,
    HttpClientModule, RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ZoomGraphicsTask';
  public darkModeToggle: FormControl = new FormControl<boolean>(false);
  private breakpointObserver = inject(BreakpointObserver);
  readonly darkClassName: string = 'theme-dark';
  readonly lightClassName: string = 'theme-light';
  @HostBinding('class') className = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    let darkModeValueFromStorage: boolean = this.getDarkModeValueFromStorage();
    this.darkModeToggle = new FormControl<boolean>(darkModeValueFromStorage);
    this.changeThemeClassName(darkModeValueFromStorage);
    this.subscribeToDarkModeChanges();

  }

  private getDarkModeValueFromStorage(): boolean{
    let isDarkModeEnabled: string | null =  localStorage.getItem('isDarkModeEnabled');
    return isDarkModeEnabled === "true";
  }
  private updateDarkModeStatusInLocalStorage(isDarkMode: boolean){
      localStorage.setItem('isDarkModeEnabled', String(isDarkMode))
  }

  private changeThemeClassName(isDarkModeEnabled: boolean) {
    this.className = isDarkModeEnabled ? this.darkClassName: this.lightClassName;
  }

  private subscribeToDarkModeChanges() {
    this.darkModeToggle.valueChanges
      .pipe(
        map((isDarkModeEnabled: boolean) => {
          this.updateDarkModeStatusInLocalStorage(isDarkModeEnabled);
          return isDarkModeEnabled;
        }),
        map((isDarkModeEnabled: boolean) => {
          this.changeThemeClassName(isDarkModeEnabled);
        })
      )
      .subscribe()
  }
}
