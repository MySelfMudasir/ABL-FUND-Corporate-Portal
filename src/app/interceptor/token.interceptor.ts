import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StateService } from '../service/state.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const stateService = inject(StateService);

  const globalAuthToken = stateService.getGlobalAuthToken() || '';
  const newReq = req.clone({
    setHeaders:{
      Authorization: `Mbs645 ${globalAuthToken}`,
      'Content-Type': `application/json`
    }
  })
  return next(newReq);
};
