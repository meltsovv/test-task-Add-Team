import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCodeEnum } from 'src/app/types/response-status-enum';
import { ErrorService } from 'src/app/services/error.service';
import { IError } from 'src/app/types/errors';



@Injectable()
export class UnprocessableEntityInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        () => {},
        (error) => {
          if (error.status === HttpCodeEnum.UNPROCESSABLE_ENTITY) {
            this.errorService.error = error.error;
            this.errorService.somethingWentWrong = false;
          } else {
            this.errorService.error = new IError()
            this.errorService.somethingWentWrong = true;
          }
        }
      ),
    );
  }
}
