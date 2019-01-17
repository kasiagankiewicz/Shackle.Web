import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  body: {},
  headers: {},
  params: {},
  observe: 'response' as 'body'
};

export abstract class BaseApiService {

  constructor(private http: HttpClient) {}

  protected get<TData>(url: string, params?: any): Observable<TData> {
    return this
      .request<TData>('GET', url, null, params)
      .pipe(map(response => response.body));
  }

  protected post(url: string, data: any): Observable<number> {
    return this
      .request('POST', url, data)
      .pipe(map(response => response.body));
  }

  protected put<TData>(url: string, data: any): Observable<TData> {
    return this
      .request<TData>('PUT', url, data)
      .pipe(map(response => response.body));
  }

  protected delete<TData>(url: string): Observable<TData> {
    return this
      .request<TData>('DELETE', url)
      .pipe(map(response => response.body));
  }

  private request<TData>(method: string, url: string, data?: TData, params?: any): Observable<HttpResponse<TData>> {

    httpOptions.body = data;
    httpOptions.params = params;
    httpOptions.headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });

    return this.http.request<HttpResponse<TData>>(method, `${environment.apiUrl}/${url}`, httpOptions);
  }
}
