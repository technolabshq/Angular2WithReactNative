import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Exercise} from '../models/exercise';

@Injectable()
export class ExerciseService {
  private baseUrl = 'https://api.myjson.com/bins/'; 
  constructor (private http: Http) {}
 
  getExercises(url:string): Observable<Exercise[]> {
    return this.http.get(this.baseUrl+url).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    //console.log(JSON.stringify(body));
    return body.data || [];
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
