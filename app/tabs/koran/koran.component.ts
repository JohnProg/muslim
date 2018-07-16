import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { LocalStorage } from "~/shared/utils.localstorage";
import { getKoranMenuChapters } from "../../shared/api";
@Component({
    selector: "koran",
    moduleId: module.id,
    templateUrl: "./koran.component.html",
    styleUrls: ["./koran.component.css"]
})
export class KoranComponent implements OnInit {
    items = [];
    pageNum: number = 1;
    pageSize: number = 10;
    chapterID: string = "CHAPTER_TITTLE";
    constructor(
        private apollo: Apollo) {

    }

    ngOnInit(): void {
        this.queryData();
    }
    queryData() {
        this.apollo.watchQuery<any>({
            query: getKoranMenuChapters,
            variables: {
                pageNumber: this.pageNum,
                pageSize: this.pageSize
            }
        })
            .valueChanges
            .subscribe(({ data }) => {
                data.getQuranChapters.chapters.forEach((e) => {
                    this.pageNum += 1;
                    this.items.push({
                        title: e.englishInfo.title,
                        auther: e.englishInfo.alias,
                        id: e.id,
                        araibicInfo: e.arabicInfo.title,
                        single: e.id,
                        count:  e.sectionsCount
                    });
                });
            });
    }
    loadMoreItems() {
        this.queryData();
    }
    getReadContent(index: any) {
        LocalStorage.set(this.chapterID, this.items[index].title);
    }
}
