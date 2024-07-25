import { Injectable } from "@angular/core";
import { ITutorial } from "./tutorial.model";
import { RestService } from "./rest.service";
import { BehaviorSubject } from "rxjs";
import { DisplayMode } from "../enum/DisplayMode";

@Injectable()
export class TutorialsService {
  public listDisplayMode: DisplayMode = DisplayMode.LD_ALL
  private static isInitialised: boolean = false;

  /**
   * The observables
   */
  private readonly _tutorials = new BehaviorSubject<ITutorial[]>([]);
  tutorials$ = this._tutorials.asObservable();

  constructor(private _service: RestService) {
    this.initialiseService();
  }

  private initialiseService() {
    if (! TutorialsService.isInitialised) {
      this.fetchAllTutorials();
      TutorialsService.isInitialised = true;
    }
  }

  /**
   * get tutorials array from BehaviourSubject
   */
  get tutorials(): ITutorial[] {
    return this._tutorials.getValue();
  }

  /**
   * set tutorials array in BehaviourSubject
   */
  set tutorials(val: ITutorial[]) {
    this._tutorials.next(val);
  }

  async createTutorial(newtutorial: ITutorial, file: File) {
    const tutorials = this.tutorials;

    try {
      const tutorial = await this._service.createTutorial(newtutorial, file).toPromise();
      this.tutorials.push(tutorial!);
    } catch (e) {
      this.tutorials = tutorials;
      this.listDisplayMode = DisplayMode.LD_ALL;
    }
  }

  async fetchAllTutorials() {
    this.tutorials = await this._service.getAllTutorials().toPromise() || [];
    this.listDisplayMode = DisplayMode.LD_ALL
  }

  async updateTutorial(updatedTutorial: ITutorial, file?: File) {
    const tutorials = this.tutorials;

    try {
      let index = this.tutorials.findIndex(tutorial => tutorial.id === updatedTutorial.id);
      if (file === undefined) {
          const tutorial = await this._service.updateTutorial(updatedTutorial).toPromise();
          this.tutorials[index] = tutorial!;
      } else {
        const tutorial = await this._service.updateTutorialWithFile(updatedTutorial, file).toPromise();
        this.tutorials[index] = tutorial!;
      }
    } catch (e) {
      this.tutorials = tutorials;
      this.listDisplayMode = DisplayMode.LD_ALL;
    }
  }

  async deleteTutorial(id: number, serverRemove = true) {
    const tutorial = this.tutorials.find(t => t.id === id);
    this.tutorials = this.tutorials.filter(t => t.id !== id);

    if(serverRemove) {
      try {
        await this._service.deleteTutorial(id).toPromise();
      } catch (e) {
          this.tutorials = [...this.tutorials, tutorial!];
          this.listDisplayMode = DisplayMode.LD_ALL;
        }
    }
  }

  async deleteAllTutorials(serverRemove = true) {
    const tutorials = this.tutorials;
    this.tutorials = [];

    if(serverRemove) {
      try {
        await this._service.deleteAllTutorials().toPromise();
      } catch (e) {
          this.tutorials = tutorials;
      }
    }
  }

  async findTutorialById(tid: number) {
    const tutorials = this.tutorials;
    this.tutorials = this.tutorials.filter(t => t.id == tid);
    try {
      const tutorial = await this._service.findTutorialById(tid).toPromise()
      if (tutorial == null) {
        this.tutorials = [];
      } else {
        this.tutorials = [tutorial!];
      }
      this.listDisplayMode = DisplayMode.LD_SINGLE;
    } catch (e) {
      this.tutorials = tutorials;
      this.listDisplayMode = DisplayMode.LD_ALL;
    }
  }

  async findAllPublishedTutorials() {
    const tutorials = this.tutorials;
    this.tutorials = [];

    try {
      this.tutorials = await this._service.findAllPublishedTutorials().toPromise() || [];
      this.listDisplayMode = DisplayMode.LD_PUBLISHED;
    } catch (e) {
      this.tutorials = tutorials;
      this.listDisplayMode = DisplayMode.LD_ALL;
    }
  }

  async findAllUnpublishedTutorials() {
    const tutorials = this.tutorials;
    this.tutorials = [];

    try {
      this.tutorials = await this._service.findAllUnpublishedTutorials().toPromise() || [];
      this.listDisplayMode = DisplayMode.LD_UNPUBLISHED;
    } catch (e) {
      this.tutorials = tutorials;
      this.listDisplayMode = DisplayMode.LD_ALL;
    }
  }

  async findTutorialsByKeywords(keywords: string[]) {
    const tutorials = this.tutorials;

    try {
      const tutorials = await this._service.findTutorialsByKeywords(keywords).toPromise() || [];
      if (tutorials == null) {
        this.tutorials = [];
      } else {
        this.tutorials = [...tutorials];
        this.listDisplayMode = DisplayMode.LD_KEYWORDS;
      }
    } catch (e) {
      this.tutorials = tutorials;
      this.listDisplayMode = DisplayMode.LD_ALL;
    }
  }

  async publishTutorial(id: number, serverPublish = true) {
    let tutorial = this.tutorials.find(t => t.id === id);
    if (tutorial) {
      const index = this.tutorials.indexOf(tutorial);

      const published = true;

      this.tutorials[index] = {...tutorial, published}

      this.tutorials = [...this.tutorials];
    }

    if(serverPublish) {
      try {
        await this._service.publishTutorial(id).toPromise();
      } catch (e) {
          this.tutorials = [...this.tutorials, tutorial!];
      }
    }
  }

  async publishAllTutorials(serverPublish = true) {
    const tutorials = this.tutorials;

    this.tutorials.forEach(tutorial => tutorial.published = true);

    if(serverPublish) {
      try {
        await this._service.publishAllTutorials().toPromise();
      } catch (e) {
          this.tutorials = tutorials;
      }
    }
  }

  findAllTutorials() {
    this.fetchAllTutorials();
    this.listDisplayMode = DisplayMode.LD_ALL;
  }

  getTutorialsCount(): number {
    let itemcount = 0;
    this.tutorials$.forEach(t => {
      itemcount = t.length;
    });

    return itemcount;
  }

  getListDisplayMode(): DisplayMode {
    return this.listDisplayMode;
  }

  setListDisplayMode(displayMode: DisplayMode): void {
    this.listDisplayMode = displayMode;
  }

  getTutorialById(tid: number): ITutorial {
    let index = this.tutorials.findIndex(t => t.id === tid);
    return this.tutorials[index];
  }
}
