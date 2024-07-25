import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KeywordsService } from '../../services/keyword.service';
import { ServicesModule } from '../../services/services.module';
import { TutorialsService } from '../../model/tutorials.service';
import { ITutorial } from '../../model/tutorial.model';
import { ClickAction } from '../../enum/ClickAction';
import { TutorialComponent } from '../tutorial.component';

@Component({
  selector: 'findtutorial-tag',
  templateUrl: 'findtutorial.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ServicesModule],
})
export class FindTutorialComponent implements OnInit {
  private tutorials: ITutorial[];
  private clickAction: ClickAction = ClickAction.CA_CANCEL;
  private tutorialComponent = inject(TutorialComponent);

  keywordsService = inject(KeywordsService);

  constructor(
    private tutorialsService: TutorialsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.keywordsService.clearKeywords();
    this.tutorials = this.tutorialsService.tutorials;
  }

  async findTutorial() {
    let oldDisplayMode = this.tutorialsService.listDisplayMode;

    await this.tutorialsService.findTutorialsByKeywords(
      this.keywordsService.getKeywords()
    );
    if (this.tutorialsService.tutorials.length === 0) {
      this.showModal();
      this.tutorialsService.listDisplayMode = oldDisplayMode;
      this.tutorialComponent.showPreviousTutorialsList();
      this.tutorialComponent.resetTutorialsPaging();
    }
    this.router.navigate(['/tutorial']);
  }

  addKeyWord(): void {
    this.keywordsService.addKeyword('');
  }

  isAddMoreKeywordsDisabled(): boolean {
    return !this.keywordsService.canKeywordBeAdded();
  }

  getClass(): string {
    return this.keywordsService.getKeywords().length <
      this.keywordsService.getMaxKeywords()
      ? 'bg-success'
      : 'bg-danger';
  }

  trackByFn(index: number): number {
    return index;
  }

  home() {
    this.tutorialsService.tutorials = this.tutorials;
    this.router.navigate(['/tutorial']);
  }

  isFindButtonDisabled() {
    let formValid: boolean = false;

    const form = document.getElementById('findForm') as HTMLFormElement;
    formValid = form.checkValidity();

    return !formValid || this.keywordsService.getKeywords().length == 0;
  }

  /**
   *
   * @param event This method is needed for change detection
   */
  onInput(event: Event) {}

  private showModal() {
    const myModal = document.getElementById('modalButton');
    myModal?.click();
  }
}
