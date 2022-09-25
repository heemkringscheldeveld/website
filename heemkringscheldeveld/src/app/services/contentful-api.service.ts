import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ScullyApiService } from './scully-api.service';

@Injectable({
  providedIn: 'root'
})
export class ContentfulApiService {

  private baseUrl = 'https://cdn.contentful.com/'
  private getEntriesUrl = (spaceId: string, environmentId: string) => `${this.baseUrl}spaces/${spaceId}/environments/${environmentId}/entries?access_token=${environment.contentfulApiKey}`;

  constructor(private scullyApi: ScullyApiService) { }

  public getEntriesByContentType<T>(contentType: string) {
    const getEntriesUrl = this.getEntriesUrl('swxne0473p3r', 'master');
    const url = `${getEntriesUrl}&content_type=${contentType}`;

    return this.scullyApi.get<T>(url);
  }
}
