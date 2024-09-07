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
import { InlineResponse20025 } from '../model/inlineResponse20025';
import { InlineResponse20026 } from '../model/inlineResponse20026';
import { Log } from '../model/log';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import {environment} from "../../../../../../../environments/environment";


@Injectable()
export class LogService {

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
     * updateLog
     * Update Log
     * @param body
     * @param id id of Log
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateLog(body: Log, id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20026>;
    public updateLog(body: Log, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20026>>;
    public updateLog(body: Log, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20026>>;
    public updateLog(body: Log, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling 3ac95b87739c3f60f50f01405bde87ad.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling 3ac95b87739c3f60f50f01405bde87ad.');
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

        return this.httpClient.request<InlineResponse20026>('put',`${this.basePath}/logs/${encodeURIComponent(String(id))}`,
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
     * getLogItem
     * Get Log
     * @param id id of Log
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getLogItem(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20026>;
    public getLogItem(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20026>>;
    public getLogItem(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20026>>;
    public getLogItem(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling 4aa2b06765e6a46bfee37102d6810c88.');
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

        return this.httpClient.request<InlineResponse20026>('get',`${this.basePath}/logs/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteLog
     * Delete Log
     * @param id id of Log
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteLog(id: number, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse2002>;
    public deleteLog(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse2002>>;
    public deleteLog(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse2002>>;
    public deleteLog(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling a8600d888983a5555731f45fa9600ddb.');
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

        return this.httpClient.request<InlineResponse2002>('delete',`${this.basePath}/logs/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * createLog
     * Create Log
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createLog(body: Log, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20026>;
    public createLog(body: Log, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20026>>;
    public createLog(body: Log, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20026>>;
    public createLog(body: Log, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling c4d265e8dccd6fd68487c2bfbe5943ac.');
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

        return this.httpClient.request<InlineResponse20026>('post',`${this.basePath}/logs`,
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
     * getLogList
     * Get all Logs
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getLogList(observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20025>;
    public getLogList(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20025>>;
    public getLogList(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20025>>;
    public getLogList(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<InlineResponse20025>('get',`${this.basePath}/logs`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
