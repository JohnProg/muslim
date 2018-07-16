import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Apollo, ApolloModule } from "apollo-angular";
import { HttpLink, HttpLinkModule } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, from } from "apollo-link";
import { onError } from "apollo-link-error";
import { Feedback } from "nativescript-feedback";
import firebase = require("nativescript-plugin-firebase");
import { Color } from "tns-core-modules/color";
import { LoadingService } from "./loading.service";
import { LocalStorage } from "./utils.localstorage";

@NgModule({
    exports: [
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ]
})
export class GraphQLModule {
    token: string = "TOKEN";
    feedback: Feedback;
    constructor(
        private apollo: Apollo,
        private loadService: LoadingService,
        private httpLink: HttpLink
    ) {
        this.initWare();
    }

    initWare() {
        const http = this.httpLink.create({ uri });
        const token = LocalStorage.get(this.token) || "Bearer 4953074841944064";
        const authMiddleware = new ApolloLink((operation, forward) => {
            // add the authorization to the headers
            operation.setContext({
                headers: new HttpHeaders().set("Authorization", token || null)
            });
            this.loadService.show();

            return forward(operation);
        });
        const checkCodeLink = new ApolloLink((operation, forward) => {
            return forward(operation).map((response) => {
                if (response.data.code && response.data.code === 403) {
                    firebase.getAuthToken({
                        forceRefresh: false
                    }).then(
                        (t) => {
                            const isRead = LocalStorage.set(this.token, t);
                        },
                        (errorMessage) => {
                            this.feedback.show({
                                title: "Message!",
                                titleColor: new Color("#222222"),
                                message: "Please check your network!",
                                messageColor: new Color("#333333"),
                                duration: 2000,
                                backgroundColor: new Color("#ffc107")
                            });
                        }
                    );
                }
                this.loadService.hide();
                console.log(response);

                return response;
            });
        });

        const errorLink = onError(({ graphQLErrors, networkError, response }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) =>
                    this.feedback.show({
                        title: "Message!",
                        titleColor: new Color("#222222"),
                        message: "Please check your network!",
                        messageColor: new Color("#333333"),
                        duration: 2000,
                        backgroundColor: new Color("#ffc107")
                    })
                );
            }

            if (networkError) {
                this.feedback.show({
                    title: "Message!",
                    titleColor: new Color("#222222"),
                    message: "Please check your network!",
                    messageColor: new Color("#333333"),
                    duration: 2000,
                    backgroundColor: new Color("#ffc107")
                });
            }

            this.loadService.hide();
        });

        this.createApollo([authMiddleware, errorLink, checkCodeLink, http]);
    }

    createApollo(params) {
        this.apollo.create({
            link: from([...params]),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: "network-only",
                    errorPolicy: "all"
                }
            }
        });
    }
}
