export interface Banner {
    _id: string;
    title: string;
    imageUrl: string;
    url: string;
    selectedLocationBanner: string;
}

export interface Category {
    _id: string;
    name: string;
    imageUrl: string;
    showInHomePage: boolean;
}
