import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { countryListAlpha } from 'src/app/core/data/country-codes.array';
import { daysOfWeek } from 'src/app/core/data/days.array';
import { timezoneList } from 'src/app/core/data/timezone-list.array';
import { ApiService } from 'src/app/services/api.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/types/user';
import { ErrorService } from 'src/app/services/error.service';
import { IError } from 'src/app/types/errors';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit, OnDestroy {
  addTeamForm: FormGroup;

  timezoneList = timezoneList;

  daysOfWeek = daysOfWeek;

  countryList = countryListAlpha;

  chosenUsers: User[] = [];

  approvedUsers: User[] = [];

  users: User[] = [];

  working_days: number[] = [];

  private destroyed$: Subject<null> = new Subject();

  constructor(fb: FormBuilder, private api: ApiService, public errorService: ErrorService,private _snackBar: MatSnackBar) {
    this.addTeamForm = fb.group({
      name: ['', Validators.required],
      country_code: ['', Validators.required],
      timezone: ['', Validators.required],
      users: [[], Validators.required],
      working_days: [[], Validators.required],
      approvers: [[], Validators.required],
      is_import_holidays: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.api
      .getDropDownUsers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.users = res.data;
      });
  }

  saveTeam(): void {
    this.api
      .saveTeam(this.addTeamForm.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.errorService.error = new IError()
        this.errorService.somethingWentWrong = false;
        this._snackBar.open('Saved', 'close');
      });
  }

  setDay(day: number) {
    if (!this.working_days.includes(day)) {
      this.working_days.push(day);
    } else {
      this.working_days = this.working_days.filter((el) => el != day);
    }
    this.addTeamForm.get('working_days')?.patchValue(this.working_days);
  }

  addUser(user: User) {
    if (!this.chosenUsers.includes(user)) {
      this.chosenUsers.push(user);
      this.addTeamForm.get('users')?.patchValue(this.chosenUsers.map(el=> el.id));
    }
  }

  removeUser(e: User) {
    this.chosenUsers = this.chosenUsers.filter((el) => el != e);
    this.addTeamForm.get('users')?.patchValue(this.chosenUsers.map(el=> el.id));
  }

  clearUsers() {
    this.chosenUsers = [];
    this.addTeamForm.get('users')?.patchValue(this.chosenUsers.map(el=> el.id));
  }

  addApprovedUser(user: User) {
    if (!this.approvedUsers.includes(user)) {
      this.approvedUsers.push(user);
      this.addTeamForm.get('approvers')?.patchValue(this.approvedUsers.map(el=> el.id));
    }
  }

  removeApprovedUser(user: User) {
    this.approvedUsers = this.approvedUsers.filter((el) => el != user);
    this.addTeamForm.get('approvers')?.patchValue(this.approvedUsers.map(el=> el.id));
  }

  clearApprovedUsers() {
    this.approvedUsers = [];
    this.addTeamForm.get('approvers')?.patchValue(this.approvedUsers.map(el=> el.id));
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
