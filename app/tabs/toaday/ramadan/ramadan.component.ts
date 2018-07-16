import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { RouterExtensions } from "nativescript-angular/router";
import {
    CalendarEvent, CalendarSelectionMode,
    CalendarViewMode, CalendarViewModeChangedEventData
} from "nativescript-ui-calendar";
import { RadCalendarComponent } from "nativescript-ui-calendar/angular";
import { isAndroid } from "platform";
import { SwipeGestureEventData } from "ui/gestures";
import { RamadanEventsService } from "./ramadan-events.service";
const momentHi = require("moment-hijri");

@Component({
    selector: "ramadan",
    moduleId: module.id,
    templateUrl: "./ramadan.component.html",
    styleUrls: ["./ramadan.component.css"],
    providers: [RamadanEventsService]
})
@Injectable()
export class RamadanComponent implements OnInit {

    @ViewChild("myRalendar") _ramadan: RadCalendarComponent;
    @ViewChild("myCalendar") _calendar: RadCalendarComponent;

    _viewMode;
    _selectionMode;
    _events: Array<CalendarEvent>;
    nowDate: any;
    selectedDates: Array<string> = [];
    countries: Array<object>;
    title: string;
    // = "Rajab 1439 AH";

    constructor(
        private _ramadanEService: RamadanEventsService,
        private routerExtensions: RouterExtensions
    ) {
        this._viewMode = CalendarViewMode.Month;
        this._selectionMode = CalendarSelectionMode.None;
    }

    ngOnInit() {
        moment.locale("en");
        this.nowDate = moment();
        this._events = this._ramadanEService.getCalendarEvents(this.nowDate);
        // 斋月第一天
        const yiCalendar = this._ramadanEService.getCalendarByYiCalendar("/9/1");
        if (yiCalendar) {
            const len = this._ramadanEService.monthIs30Day("/9/30") ? 30 : 29;
            let addDay = moment(yiCalendar);
            for (let i = 1; i <= len; i++) {
                this.selectedDates.push(addDay.format("YYYY-M-D"));
                addDay = moment(addDay).add(1, "d");
            }
        }
        this.title = this._ramadanEService.getYiCalendarByCalendar(yiCalendar);
    }

    get selectionMode() {
        return this._selectionMode;
    }

    get viewMode() {
        return this._viewMode;
    }

    get eventSource() {
        return this._events;
    }

    set eventSource(value) {
        this._events = value;
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    setEventSource(args: SwipeGestureEventData) {
        const direction = args.direction;
        // 开斋节
        const ramadanEnd = this._ramadanEService.getCalendarByYiCalendar("/10/1");
        if (direction === 1) { // left
            if (ramadanEnd) {
                this.nowDate = moment(ramadanEnd).subtract(1, "M");
            }
        } else if (direction === 2) { // right
            this.nowDate = ramadanEnd;
        }
        this._ramadan.nativeElement.goToDate(new Date(this.nowDate));
        this.title = this._ramadanEService.getYiCalendarByCalendar(this.nowDate) + " AH";
        setTimeout(
            () => this.eventSource = this._ramadanEService.getCalendarEvents(this.nowDate)
            , 100);
    }

    onViewModeChangedEvent(args: CalendarViewModeChangedEventData) {
        // this._calendar.nativeElement.goToDate(new Date(this.nowDate));
    }

    calendarloaded(args) {
        if (isAndroid) {
            args.object.android.getGestureManager().setDoubleTapToChangeDisplayMode(false);
        }
    }
}
