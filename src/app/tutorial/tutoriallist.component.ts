import { Component, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TutorialsService } from "../model/tutorials.service";
import { ITutorial } from "../model/tutorial.model";
import { TutorialDetailComponent } from "./tutorialdetails/tutorialdetail.component";
import { CounterDirective } from "./directives/counter.directive";

@Component ({
    selector: 'tutoriallist-tag',
    templateUrl: "tutoriallist.component.html",
    standalone: true,
    imports: [CommonModule, TutorialDetailComponent, CounterDirective]
})

/**
 * This component can be used by another component for communication purposes (e.g see tutorial.component.ts).
 */
@Injectable()
export class TutorialListComponent {
    private tutorial: ITutorial;;
    private pageCount = 0;

    tutorialsPerPage = 3;
    selectedPage = 1;

    pagingStart = 0;
    pagingEnd = this.tutorialsPerPage;

    constructor(public tutorialsService: TutorialsService, private router: Router) {
        this.setPaging();
    }

    ngOnInit() {
    }

    trackFn = (i: number, tut: ITutorial) => tut.id;

    // button handlings
    IsHomeButtonChecked(): boolean {
        return this.router.url === "/tutorial";
    }

    IsHomeButtonDisabled(): boolean {
        return this.router.url === "/tutorial";
    }

    // paging
    isPagingSelectDisabled(): boolean {
        return this.tutorialsService.tutorials.length <= this.tutorialsPerPage;
    }

    changePageSize(event: Event): void {
        let filterValue = (event.target as HTMLInputElement).value;

        this.tutorialsPerPage = parseInt(filterValue);
        this.selectedPage = 1;
        this.setPaging();
    }

    getPageCount(): number {
        this.pageCount = Math.ceil(this.tutorialsService.getTutorialsCount() / this.tutorialsPerPage);

        return this.pageCount
    }

    changePage(newPage: number): void {
        this.selectedPage = newPage;
        this.setPaging();
    }

    setPaging() {
        this.pagingStart = (this.selectedPage - 1) * this.tutorialsPerPage;
        this.pagingEnd = this.pagingStart + this.tutorialsPerPage;
    }

    resetPaging() {
        this.tutorialsPerPage = 3;
        this.selectedPage = 1;
        this.pageCount = this.getPageCount();
        this.setPaging();
    }
}
