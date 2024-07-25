import { Component, Input } from "@angular/core";
import { ITutorial } from "../../model/tutorial.model";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { TutorialsService } from "../../model/tutorials.service";
import { NoCommaPipe } from "../pipes/nocomma.pipe";

@Component ({
    selector: 'tutorialdetail-tag',
    templateUrl: "tutorialdetail.component.html",
    styleUrls: ['tutorialdetail.component.css'],
    standalone: true,
    imports: [CommonModule, NoCommaPipe]
})

export class TutorialDetailComponent {
    @Input() tutorial: ITutorial;

    constructor(private tutorialsService: TutorialsService, private router: Router) {
    }

    getPublishedClass(tutorial: ITutorial): string {
        return (tutorial.published ? "bg-success" : "bg-danger");
    }

    getPublishedString(tutorial: ITutorial): string {
        return (tutorial.published ? "yes" : "no");
    }

    isButtonHidden(tutorial: ITutorial): boolean {
        return tutorial.published || false;
    }

    // button handling from publish
    publishTutorial(tutorial: ITutorial): void {
        this.tutorialsService.publishTutorial(tutorial.id!);
    }

    // button handling from delete
    deleteTutorial(tutorial: ITutorial): void {
        this.tutorialsService.deleteTutorial(tutorial.id!);
    }

    // button handling from update
    updateTutorial(tutorial: ITutorial): void {
        this.router.navigate(['/create', tutorial.id])
    }
}