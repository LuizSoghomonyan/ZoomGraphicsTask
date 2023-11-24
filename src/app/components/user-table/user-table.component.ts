import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {UserData} from "../../models/user-data";
import {UserService} from "../../services/user.service";
import {map} from "rxjs/operators";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";

@Component({
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterLink],
  providers: [
    UserService,
    DatePipe
  ],
  selector: 'app-user-table',
  standalone: true,
  styleUrl: './user-table.component.scss',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit, AfterViewInit{
  public users: UserData[] = [];
  public isReady: boolean = false;
  public displayedColumns: string[] = [
    'position',
    'first_name',
    'email',
    'date_of_birth',
    'phone_number'];
  public dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserData()
      .pipe(
        map(userData => {
          this.users = userData
          this.dataSource = new MatTableDataSource(userData)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }),

      )
      .subscribe( () => {
        this.isReady = true;
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
