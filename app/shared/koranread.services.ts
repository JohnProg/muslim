import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
@Injectable()
export class KoranReadService {
    subject = new BehaviorSubject<any>(null);
    sendMessage(message: boolean) {
        this.subject.next(message);
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
