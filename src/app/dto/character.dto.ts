export class CharacterDTO {
    id: number = 0;
    name: string = "";
    status: string = "";
    species: string = "";
    type: string = "";
    gender: string = "";
    origin?: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    } | undefined;
    image: string = "";
    episode: string[] = [""];
    url: string = "";
    created: string = "";
}