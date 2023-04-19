import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Data } from '../model/data';

@Injectable()
export class BusinessService {

  constructor(
    private http: HttpClient
  ) { }

  getData(): Observable<Data[]> {
    return this.http.get<ApiResponse<Data[]>>(`${environment.apiUrl}/rest/entity`)
      .pipe(map(response => response.content));
  }

}
