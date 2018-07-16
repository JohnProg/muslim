import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
@Injectable()
export class KoranService {
    subject = new BehaviorSubject<any>(0);
    sendMessage(message: number) {
        this.subject.next(message);
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
