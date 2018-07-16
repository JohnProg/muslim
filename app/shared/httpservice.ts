// >> http-post-service
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
// tslint:disable-next-line:no-duplicate-imports
import { HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs";
import { LocalStorage } from "../shared/utils.localstorage";
@Injectable()
export class MyHttpPostService {
    serverUrl = "http://192.168.1.60:3000/graphql";
    token: string = LocalStorage.get("TOKEN");
    constructor(private http: HttpClient) {
    }

    postData(data: any) {
        const options = this.createRequestOptions();

        return this.http.post(this.serverUrl, { data }, { headers: options });
    }

    createRequestOptions() {
        const headers = new HttpHeaders({
            authorization: this.token
        });

        return headers;
    }
}
// << http-post-service
