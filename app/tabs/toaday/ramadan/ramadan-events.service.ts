import { Injectable, OnInit } from "@angular/core";
import { Color } from "color";
import { CalendarEvent } from "nativescript-ui-calendar";
const moment = require("moment-hijri");

@Injectable()
export class RamadanEventsService implements OnInit {

    private iYDate = moment().iYear();

    ngOnInit() {
        moment.locale("en");
    }

    // 渲染伊历
    getCalendarEvents(now): Array<CalendarEvent> {
        // tslint:disable-next-line:one-variable-per-declaration
        let startDate: Date, endDate: Date, event: CalendarEvent;
        const colors: Array<Color> = [new Color("#fff"), new Color(220, 255, 109, 130)];
        const events: Array<CalendarEvent> = new Array<CalendarEvent>();

        now = new Date(now);
        const year = now.getFullYear();
        const month = now.getMonth();
        const curMonthDays = new Date(year, (month + 1), 0).getDate();

        for (let i = 1; i < curMonthDays + 1; i++) {
            startDate = new Date(year, month, i, 1);
            endDate = new Date(year, month, i, 3);

            const hijri = moment(startDate).format("iM/iD");
            const yearHi = hijri.split("/")[0];
            const dayHi = hijri.split("/")[1];

            event = new CalendarEvent(hijri, startDate, endDate, false, colors[0]);
            events.push(event);

            if (dayHi === "1" && yearHi === "10") {
                event = new CalendarEvent("AI-Fitr", startDate, endDate, true, colors[1]);
                events.push(event);
            }

            if (dayHi === "10" && yearHi === "12") {
                event = new CalendarEvent("AI-Adha", startDate, endDate, true, colors[1]);
                events.push(event);
            }
        }

        return events;
    }

    /**
     * 伊历转换公历
     * @param date "/9/1"
     */
    getCalendarByYiCalendar(date: string): string {
        let gregorianCalendar = null;
        if (date && typeof (date) === "string") {
            gregorianCalendar = moment(this.iYDate + date, "iYYYY/iM/iD").format("YYYY-M-D");
        }

        return gregorianCalendar;
    }

    /**
     * 公历转换伊历,只有年月
     * @param date
     */
    getYiCalendarByCalendar(date: any): string {
        let yiCalendar = null;
        if (date) {
            yiCalendar = moment(date).format("iYYYY/iM");
        }

        return yiCalendar;
    }

    /**
     * 判断当月是否是30天，最后一位必须是30
     * @param date "/9/30"
     */
    monthIs30Day(date: string): boolean {
        let is30Day = false;
        if (date && typeof (date) === "string") {
            is30Day = moment(this.iYDate + date, "iYYYY/iMM/iDD").isValid();

            return is30Day;
        }

        return false;
    }

}
