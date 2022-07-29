import { Injectable } from '@angular/core';
import { IError } from '../types/errors';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  error: IError = new IError();

  somethingWentWrong: boolean = false;

  getNestedError(field: string) {
    return Object.entries(this.error.errors)
      .filter((el) => el[0] === field)
      .map((el) => el[1])[0]
      ?.join(' ');
  }
}
