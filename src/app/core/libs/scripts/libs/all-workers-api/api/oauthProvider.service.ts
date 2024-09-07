/**
 * Api documentation
 * Api documentation
 *
 * OpenAPI spec version: 1.0.0
 * Contact: codeguessdev237@codeguess.cm
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { InlineResponse2002 } from '../model/inlineResponse2002';
import { InlineResponse20031 } from '../model/inlineResponse20031';
import { InlineResponse20032 } from '../model/inlineResponse20032';
import { OauthProvider } from '../model/oauthProvider';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import {environment} from "../../../../../../../environments/environment";


@Injectable()
export class OauthProviderService {

    protected basePath = environment.baseURL;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * deleteOauthProvider
     * Delete OauthProvider
     * @param id id of OauthProvider
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteOauthProvider(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse2002>;
    public deleteOauthProvider(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse2002>>;
    public deleteOauthProvider(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse2002>>;
    public deleteOauthProvider(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling 57fe5936bc8b5f6819f70e1abc330046.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse2002>('delete',`${this.basePath}/oauth-providers/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * createOauthProvider
     * Create OauthProvider
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createOauthProvider(body: OauthProvider, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20032>;
    public createOauthProvider(body: OauthProvider, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20032>>;
    public createOauthProvider(body: OauthProvider, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20032>>;
    public createOauthProvider(body: OauthProvider, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling 5d2864465f808663f8c44ee35e80afbc.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<InlineResponse20032>('post',`${this.basePath}/oauth-providers`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updateOauthProvider
     * Update OauthProvider
     * @param body
     * @param id id of OauthProvider
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateOauthProvider(body: OauthProvider, id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20032>;
    public updateOauthProvider(body: OauthProvider, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20032>>;
    public updateOauthProvider(body: OauthProvider, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20032>>;
    public updateOauthProvider(body: OauthProvider, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling bca073d3499de40ecd2136fbb96f014c.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling bca073d3499de40ecd2136fbb96f014c.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<InlineResponse20032>('put',`${this.basePath}/oauth-providers/${encodeURIComponent(String(id))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getOauthProviderItem
     * Get OauthProvider
     * @param id id of OauthProvider
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOauthProviderItem(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20032>;
    public getOauthProviderItem(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20032>>;
    public getOauthProviderItem(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20032>>;
    public getOauthProviderItem(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling c7b39011ba51792e8d48b058e0566452.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse20032>('get',`${this.basePath}/oauth-providers/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getOauthProviderList
     * Get all OauthProviders
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOauthProviderList(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20031>;
    public getOauthProviderList(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20031>>;
    public getOauthProviderList(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20031>>;
    public getOauthProviderList(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse20031>('get',`${this.basePath}/oauth-providers`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
