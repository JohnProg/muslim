// tslint:disable-next-line:interface-name
export interface Post {
    id: number;
    title: string;
    votes: number;
}

// tslint:disable-next-line:interface-name
export interface GetDashboards {
    name: string;
    data: string;
}

// tslint:disable-next-line:interface-name
export interface Query {
    // posts: Post[];
    // tslint:disable-next-line:array-type
    getInspire: GetDashboards[];
}
