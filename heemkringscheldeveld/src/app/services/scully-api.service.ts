import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isScullyRunning, TransferStateService } from '@scullyio/ng-lib';
import { empty, merge, Observable } from 'rxjs';
import { filter, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root'
})
export class ScullyApiService {
   constructor(
      private http: HttpClient,
      private transferStateService: TransferStateService
   ) { }

   public getFromState<T>(url: string): Observable<T> {
      const urlHash = btoa(url);

      return this.transferStateService.stateHasKey(urlHash)
         ? this.transferStateService.getState<T>(urlHash).pipe(shareReplay(1), filter(x => x != null))
         : empty();
   }

   public getObservables<T>(url: string, setToState: boolean = true): Observable<T>[] {
      const observables: Observable<T>[] = [];

      if (setToState) {
         if (isScullyRunning()) {
            const urlHash = btoa(url);
            const observable = this.http
               .get<T>(url)
               .pipe(
                  tap(data => this.transferStateService.setState<T>(urlHash, data)),
                  shareReplay(1)
               );
            observables.push(observable);
         } else {
            // Get from state
            const stateObservable = this.getFromState<T>(url);
            observables.push(stateObservable);
         }
      }

      // if (!environment.production) {
      //    // Get from api
      //    const apiObservable = this.http.get<T>(url);
      //    observables.push(apiObservable);
      // }

      return observables;
   }

   public get<T>(url: string, setToState: boolean = true) {
      const observables = this.getObservables(url, setToState);
      return merge<T>(...observables);
   }

   public post(url: string, object: any) {
      return this.http.post(url, object);
   }
}