import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TutorialsService } from "../../model/tutorials.service";
import { Tutorial } from "../../model/tutorial.model";
import { ActionModes } from "../../enum/ActionModes";

@Component ({
    selector: 'createoredittutorial-tag',
    styleUrls: ['./createoredittutorial.component.css'],
    templateUrl: "createoredittutorial.component.html",
    standalone: true,
    imports: [FormsModule, CommonModule]
})


export class CreateOrEditTutorialComponent {
    private file: File;

    tutorial = new Tutorial();
    actionMode: ActionModes;
    buttonCaption: string;

    constructor(public tutorialService: TutorialsService, private router: Router, private route: ActivatedRoute) {
    }
    
    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id == null) {
            this.actionMode = ActionModes.AM_CREATE;
            this.tutorial.id = null;
            this.tutorial.title = "";
            this.tutorial.description = "";
            this.tutorial.published = false;
            this.buttonCaption = "Create";
        } else {
            this.actionMode = ActionModes.AM_UPDATE;
            this.tutorial = this.tutorialService.getTutorialById(+id) as Tutorial;
            this.buttonCaption = "Update";
        }
    }

    // handling the save/update button
    executeAction(): void {
        if (this.actionMode == ActionModes.AM_CREATE) {
            this.tutorialService.createTutorial(this.tutorial, this.file);
        } else if (this.actionMode == ActionModes.AM_UPDATE) {
            if (this.file == undefined) {
                this.tutorialService.updateTutorial(this.tutorial);
            } else {
                this.tutorialService.updateTutorial(this.tutorial, this.file);
            }
        }

        this.router.navigateByUrl('/tutorial');
    }

    // handling the cancel button
    cancelAction(): void {
        this.tutorialService.fetchAllTutorials();
        this.router.navigateByUrl('/tutorial');
    }

    onFileSelected(event: any) {
       this.file = event.target.files[0]
      }

    getFileInfo(): string {
        let result: string = "";
        if (this.tutorial.filename != undefined && this.tutorial.filename != "") {
            result = this.tutorial.filename;
        }

        return result;
    }

    isFileSelectRequired(): boolean { 
        return this.actionMode == ActionModes.AM_CREATE;
    }

    /**
     * 
     * @param event This method is mandatory for triggering validation
     */
    onInput(event: Event) {
    }

    isCreateButtonDisabled() {
        const form = document.getElementById("tutorialForm") as HTMLFormElement;
        return !form.checkValidity();
    }

    cancelClick() {
        this.actionMode = ActionModes.AM_CANCEL;
    }
}
