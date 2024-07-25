import { ModelModule } from "../model/model.module";
import { Component, Injectable, OnInit, inject } from "@angular/core";
import { CommonModule, NgFor } from "@angular/common";
import { TutorialsService } from "../model/tutorials.service";
import { ITutorial } from "../model/tutorial.model";
import { Router, RouterOutlet } from "@angular/router";
import { DisplayMode } from "../enum/DisplayMode";
import { TutorialListComponent } from "./tutoriallist.component";
import { TutorialDetailComponent } from "./tutorialdetails/tutorialdetail.component";
import { AllModes } from "../enum/AllModes";

@Component ({
    selector: 'tutorial-tag',
    templateUrl: "tutorial.component.html",
    styleUrls: ['tutorial.component.css'],
    standalone: true,
    imports: [ModelModule, CommonModule, RouterOutlet, TutorialDetailComponent, NgFor],
    providers: [TutorialListComponent]                      // Inter component communication
})

@Injectable()   // because we are going to inject this into another component
export class TutorialComponent implements OnInit {
    tutorialId: number = 0;
    modalText: string;
    
    private allModes: AllModes;
    private createButtonHidden: boolean = false;

    tutorialsService = inject(TutorialsService);
    
    constructor(private router: Router, private com: TutorialListComponent) {
    }

    trackFn = (i: number, tut: ITutorial) => tut.id;

    ngOnInit() {
        this.setupInputListener();
        this.router.navigate(['/details']);
    }

    // navigation to home
    home() {
        this.router.navigate(['/tutorial']);
    }

    // navigation to create
    createTutorial() {
        this.router.navigate(['/create']);
    }

    // navigation to find
    findTutorial(): void {
        this.router.navigate(['/find']);
    }

    // button handlings
    IsHomeButtonChecked(): boolean {
        return this.router.url === "/details";
    }

    IsHomeButtonDisabled(): boolean {
        return this.router.url === "/details";
    }

    IsCreateButtonChecked(): boolean {
        return this.router.url === "/create";
    }

    private isRoutingCreateOrFind(): boolean {
        return (this.router.url.includes("create") || this.router.url === "/find");
    }

    IsCreateButtonDisabled(): boolean {
        return this.isRoutingCreateOrFind();
    }

    IsFindButtonChecked(): boolean {
        return this.router.url === "/find";
    }

    IsFindButtonDisabled(): boolean {
        return this.isRoutingCreateOrFind();
    }

    private areTutorialsDisabled(displayMode : DisplayMode): boolean {
        return (
            (this.tutorialsService.getListDisplayMode() === displayMode) ||
            (this.tutorialsService.getListDisplayMode() === DisplayMode.LD_NONE) ||
            (this.router.url === "/find") ||
            (this.router.url.includes("create"))
        );
    }

    IsFindAllPublishedTutorialsDisabled(): boolean {
        return this.areTutorialsDisabled(DisplayMode.LD_PUBLISHED);
    }

    IsFindAllUnpublishedTutorialsDisabled(): boolean {
        return this.areTutorialsDisabled(DisplayMode.LD_UNPUBLISHED);
    }

    IsFindAllTutorialsDisabled(): boolean {
        return this.areTutorialsDisabled(DisplayMode.LD_ALL);
    }

    isPublishAllButtonDisabled(): boolean {
        if (this.isRoutingCreateOrFind()) {
            return true;
        }

        if (this.tutorialsService.tutorials.length > 0) {
            if (this.tutorialsService.tutorials.findIndex(tutorial => (tutorial.published === false)) != -1) {
                return false;
            }
        }
        
        return true;
    }

    isFindByIdGroupDisabled(): boolean {
        if (this.isRoutingCreateOrFind()) {
            return true;
        }

        return false;
    }

    isDeleteAllButtonDisabled(): boolean {
        return this.isPublishAllButtonDisabled();
    }

    // execution methods
    findAllPublishedTutorials(): void {
        this.resetTutorialsPaging();
        this.tutorialsService.findAllPublishedTutorials();
    }

    findAllNotPublishedTutorials(): void {
        this.resetTutorialsPaging();
        this.tutorialsService.findAllUnpublishedTutorials();
    }

    findAllTutorials(): void {
        this.tutorialsService.findAllTutorials();
    }

    async findTutorialById(idValue: string) {
        let tutorials = this.tutorialsService.tutorials;

        if (! this.isFindByIdGroupDisabled() && !(idValue == "")) {
            this.tutorialId = +idValue;
            if (! isNaN(+idValue)) {
                await this.tutorialsService.findTutorialById(+idValue);
                if (this.tutorialsService.tutorials.length == 0) {
                    this.showModalNotFound();
                    this.tutorialsService.tutorials = tutorials;
                } 
                
                this.resetTutorialsPaging();
            }
        }
    }

    private showModalNotFound() {
        const myModal = document.getElementById('modalNotFoundButton');
        myModal?.click();
    }

    deleteOrPublishAll() {
        if (this.allModes == AllModes.AM_DELETE_ALL) {
            this.tutorialsService.deleteAllTutorials();
            this.tutorialsService.setListDisplayMode(DisplayMode.LD_NONE);
        } else {
            this.tutorialsService.publishAllTutorials();
        }
    }

    deleteAllTutorials(): void {
        this.modalText = "Delete ";
        this.allModes = AllModes.AM_DELETE_ALL;
        this.showModalDeletePublish()
    }

    publishAllTutorials(): void {
        this.modalText = "Publish ";
        this.allModes = AllModes.AM_PUBLISH_ALL;
        this.showModalDeletePublish();
    }

    showPreviousTutorialsList() {
        let displayMode = this.tutorialsService.getListDisplayMode();

        switch (displayMode) {
            case DisplayMode.LD_PUBLISHED:
                this.tutorialsService.findAllPublishedTutorials();
                break;
            case DisplayMode.LD_UNPUBLISHED:
                this.tutorialsService.findAllUnpublishedTutorials();
                break;
            default:
                this.tutorialsService.fetchAllTutorials();
        }
    }

    resetTutorialsPaging() {
        this.com.resetPaging();
        document.getElementById('pagebutton1')?.click();
    }

    // used for n timer &nbsp; inserting in html
    numSequence(n: number): Array<number> { 
        return Array(n); 
    } 

    private setupInputListener() {
        let input = document.getElementById("idInput") as HTMLInputElement;

        input.addEventListener("keypress", function(event) {
          if (event.key === "Enter") {
            event.stopImmediatePropagation();
            document.getElementById("idButton")!.click();
          }
        });    
    }

    private showModalDeletePublish() {
        const myModal = document.getElementById('modalDeletePublishButton');
        myModal?.click();
    }

    // for testing purposes only
    btnClick() {
        console.log('TEST METHOD');
    }
}
