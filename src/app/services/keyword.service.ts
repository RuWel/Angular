import { Injectable } from "@angular/core";

@Injectable()
export class KeywordsService {
    private keywords: string[] = [];
    private nrOfKeywords: number = 0;
    private maxKeywords: number = 5;

    constructor() {
    }

    getKeywords(): string[] {
        return this.keywords;
    }

    clearKeywords(): void {
        this.keywords = [];
        this.nrOfKeywords = 0;
    }

    canKeywordBeAdded(): boolean {
        if (this.nrOfKeywords >= this.maxKeywords) {
            return false;
        }

        return true;
    }

    removeKeyword(keyword: string): void {
        if (this.nrOfKeywords > 0) {
            let index: number = this.keywords.findIndex(kwrd => kwrd === keyword);
            this.keywords.splice(index, 1);
            this.nrOfKeywords--;
        }
    }

    addKeyword(keyword: string): void {
        if (this.nrOfKeywords < this.maxKeywords) {
            this.keywords.push(keyword);
            this.nrOfKeywords++;
        }
    }

    getMaxKeywords(): number {
        return this.maxKeywords;
    }

    getNrOfKeywords(): number {
        return this.nrOfKeywords;
    }
}
