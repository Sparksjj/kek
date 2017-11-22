import { AuthService } from './../auth/auth.service';
import { Headers } from '@angular/http';
import { environment } from './../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: any;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

@Injectable()
export class ApplicationHttpClient {
  private api = environment.api;

  // Extending the HttpClient through the Angular DI.
  public constructor(
    public http: HttpClient,
    private authService: AuthService
  ) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @param {string} api use if there is needed to send request to different back-end than the default one.
   * @returns {Observable<T>}
   */
  public Get<T>(
    endPoint: string,
    options: IRequestOptions = {}
  ): Observable<T> {
    this.updateHeaders(options);
    return this.http.get<T>(this.api + endPoint, options);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T>(
    endPoint: string,
    params: Object,
    options: IRequestOptions = {}
  ): Observable<T> {
    this.updateHeaders(options);
    return this.http.post<T>(this.api + endPoint, params, options);
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Put<T>(
    endPoint: string,
    params: Object,
    options: IRequestOptions = {}
  ): Observable<T> {
    this.updateHeaders(options);
    return this.http.put<T>(this.api + endPoint, params, options);
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Delete<T>(
    endPoint: string,
    options: IRequestOptions = {}
  ): Observable<T> {
    this.updateHeaders(options);
    return this.http.delete<T>(this.api + endPoint, options);
  }

  private updateHeaders(data: any): void {
    data.headers = new HttpHeaders();
    if (this.authService.isLoggedIn) {
      data.headers = data.headers.append(
        'Authorization',
        'Bearer ' + this.authService.getToken()
      );
    }
  }
}
