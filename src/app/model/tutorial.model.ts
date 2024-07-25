export interface ITutorial {
    id?: number | null;
    title: string;
    description: string;
    published: boolean;
    filename?: string;
}

export class Tutorial implements ITutorial {
    id?: number | null;
    title: string;
    description: string;
    published: boolean;
    filename: string;
}