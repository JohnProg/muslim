import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import calendarModule = require("nativescript-ui-calendar");
import { RadCalendarComponent } from "nativescript-ui-calendar/angular";
import { isAndroid } from "platform";
import { SwipeGestureEventData } from "ui/gestures";
import { CalendarEventsService } from "./calendar-events.service";
import { CalendarStylesService } from "./calendar-styles.service";

@Component({
    selector: "calender",
    moduleId: module.id,
    templateUrl: "./calender.component.html",
    styleUrls: ["./calender.component.css"],
    providers: [CalendarStylesService, CalendarEventsService]
})
@Injectable()
export class CalenderComponent implements OnInit {

    @ViewChild("myCalendar") _calendar: RadCalendarComponent;

    _viewMode;
    _monthViewStyle: calendarModule.CalendarMonthViewStyle;
    _events: Array<calendarModule.CalendarEvent>;
    nowDate: any;
    _countries: Array<object>;

    get viewMode() {
        return this._viewMode;
    }

    get monthViewStyle(): calendarModule.CalendarMonthViewStyle {
        return this._monthViewStyle;
    }

    get eventSource() {
        return this._events;
    }

    set eventSource(value) {
        this._events = value;
    }

    get countries() {
        return this._countries;
    }

    set countries(value) {
        this._countries = value;
    }

    constructor(
        private _calendarService: CalendarStylesService,
        private _calendarEService: CalendarEventsService
    ) {
        this._viewMode = calendarModule.CalendarViewMode.Month;

    }

    ngOnInit() {
        moment.locale("en");
        this.nowDate = moment();
        this._countries = this._calendarEService.getListCountries(this.nowDate);
        this._events = this._calendarEService.getCalendarEvents(this.nowDate);
        this._monthViewStyle = this._calendarService.getMonthViewStyle();
    }

    setEventSource(args: SwipeGestureEventData) {
        const direction = args.direction;
        if (direction === 1) { // left
            this.nowDate = moment(this.nowDate).subtract(1, "M");
        } else if (direction === 2) { // right
            this.nowDate = moment(this.nowDate).add(1, "M");
        }
        this.countries = this._calendarEService.getListCountries(this.nowDate);
        this._calendar.nativeElement.goToDate(new Date(this.nowDate));
        setTimeout(
            () => this.eventSource = this._calendarEService.getCalendarEvents(this.nowDate)
            , 100);
    }

    onViewModeChangedEvent(args: calendarModule.CalendarViewModeChangedEventData) {
        // this.countries = this._calendarEService.getListCountries(this.nowDate);
        // this._calendar.nativeElement.goToDate(new Date(this.nowDate));
    }

    calendarloaded(args) {
        if (isAndroid) {
            args.object.android.getGestureManager().setDoubleTapToChangeDisplayMode(false);
        }
    }
}
