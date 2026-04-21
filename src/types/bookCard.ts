export interface mybookCard {
    id:number;
    title:string;
    authors: string[];
    isbn: string;
}

export interface BookWithCover extends mybookCard {
    coverBlob: Blob | null;
}