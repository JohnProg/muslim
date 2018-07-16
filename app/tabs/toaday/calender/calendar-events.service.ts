import { Injectable } from "@angular/core";
import { Color } from "color";
import { CalendarEvent } from "nativescript-ui-calendar";
const moment = require("moment-hijri");

@Injectable()
export class CalendarEventsService {

    // 渲染伊历
    getCalendarEvents(now): Array<CalendarEvent> {
        moment.locale("en");
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

    // 节日计算
    getListCountries(nowDate): Array<object>  {
        const iYear = moment(nowDate).iYear();
        const kzjDate = iYear + "/10/1"; // 开斋节
        const grbjDate = iYear + "/12/10"; // 古尔邦节
        const kzGregorianCalendar = moment(kzjDate, "iYYYY/iM/iD").format("YYYY-M-D");
        const grbGregorianCalendar = moment(grbjDate, "iYYYY/iM/iD").format("YYYY-M-D");
        const countries = [
            { name: "AI-Fitr", title: kzjDate + " AH", date: kzGregorianCalendar },
            { name: "AI-Adha", title: grbjDate + " AH", date: grbGregorianCalendar }
        ];

        return countries;
    }
}
