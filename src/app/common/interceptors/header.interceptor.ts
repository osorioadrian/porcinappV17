import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (
  req,
  next: HttpHandlerFn
) => {
  const token = localStorage.getItem('token');

  let request = req;

  if (token) {
    request = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};
