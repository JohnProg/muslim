import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { openAppSettings, openSettings, openWifiSettings } from "nativescript-advanced-permissions/core";
import {
    hasLocationPermissions,
    isLocationEnabled, requestLocationPermissions
} from "nativescript-advanced-permissions/location";
import { registerElement } from "nativescript-angular/element-registry";
import * as geolocation from "nativescript-geolocation";
// tslint:disable-next-line:no-duplicate-imports
import { getCurrentLocation, Location } from "nativescript-geolocation";
import { Circle, MapView, Marker, Position } from "nativescript-google-maps-sdk";
import { Observable } from "tns-core-modules/data/observable";
// used to describe at what accuracy the location should be get
import { Accuracy } from "ui/enums";
import { nearbySearch } from "../../../shared/api";
registerElement("MapView", () => MapView);

@Component({
    selector: "nearby",
    moduleId: module.id,
    templateUrl: "./nearby.component.html",
    styleUrls: ["./nearby.component.css"]
})

export class NearbyComponent implements OnInit, AfterViewInit {
    LOCATION_MESSAGES: {
        GRANTED: string,
        DENIED: string
    } = {
            GRANTED: "Location Permissions Granted",
            DENIED: "Location Permissions Denied"
        };
    nearbySearch: Array<any>;
    latitude: number;
    longitude: number;
    compassEnabled = true;
    zoom = 12;
    minZoom = 12;
    maxZoom = 22;
    bearing = 0;
    len: number = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;
    circle: Circle;
    distance: Array<number> = [5000, 2000, 2000, 1000, 500, 200, 100, 50, 20]; // 12
    lastCamera: string;
    location: Observable = new Observable();
    constructor(
        private apollo: Apollo
    ) {
        const appSettings = new Observable();
        appSettings.set("message", "Click the Button Below to Open App Settings");
        this.location.set("message",
            hasLocationPermissions() ? this.LOCATION_MESSAGES.GRANTED : this.LOCATION_MESSAGES.DENIED);
        this.location.set("hasPermission", hasLocationPermissions());
        this.location.set("coords", "0, 0");
    }
    ngOnInit() {
        this.requestLocationPermissions();
    }
    requestLocationPermissions() {
        requestLocationPermissions().then((hasPermission) => {
            console.log(`permission ${hasPermission ? "granted" : "denied"}`);
            this.location.set("hasPermission", hasPermission);
            this.location.set("message",
                hasPermission ? this.LOCATION_MESSAGES.GRANTED : this.LOCATION_MESSAGES.DENIED);

            return getCurrentLocation({ desiredAccuracy: Accuracy.high });
        }).then((location: Location) => {
            this.location.set("coords", `${location.latitude}, ${location.longitude}`);
        });
    }
    ngAfterViewInit(): void {
        geolocation.enableLocationRequest().then(() => {
            geolocation.getCurrentLocation({
                desiredAccuracy: Accuracy.high,
                maximumAge: 5000,
                timeout: 20000
            })
                .then((location) => {
                    this.latitude = location.latitude;
                    this.longitude = location.longitude;
                });
        }, (e) => {
            console.log("Background enableLocationRequest error: " + (e.message || e));
        });
    }

    onMapReady(event) {
        this.mapView = event.object;
        this.addMarker(this.latitude, this.longitude, "oneself");
        // this.getMuslimAround(this.latitude, this.longitude);
        // let radius;
        // if (this.zoom) {
        //     radius = this.distance[this.zoom - 12];
        // }
    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        // this.lastCamera = JSON.stringify(args.camera);
        this.getMuslimAround(args.camera.latitude, args.camera.longitude);
    }

    addMarker(lat, long, icon) {
        const marker = new Marker();
        marker.position = Position.positionFromLatLng(lat, long);
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.userData = { index: 1 };
        marker.icon = icon;
        this.mapView.addMarker(marker);
    }

    getMuslimAround(lat, long) {
        this.apollo.watchQuery<any>({
            query: nearbySearch,
            variables: {
                latitude: lat,
                longitude: long,
                radius: 5000
            }
        }).valueChanges.subscribe(({ data }) => {
            if (data && data.nearbySearch) {
                const datas = data.nearbySearch;
                const code = datas.code;
                if (code === 404) {
                    //
                } else if (code === 200) {
                    this.mapView.removeAllMarkers();
                    this.addMarker(this.latitude, this.longitude, "oneself");
                    this.nearbySearch = datas.data;
                    if (this.nearbySearch.length > 0) {
                        this.len = this.nearbySearch.length;
                        this.nearbySearch.forEach((_element) => {
                            this.addMarker(_element.latitude, _element.longitude, "positioning");
                        });
                    }
                }
            }
        });
    }

}
