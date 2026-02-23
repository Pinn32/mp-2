
export interface NekoAsset {
    url: string;
    artist_name?: string; // Image only
    artist_href?: string; // Image only
    source_url?: string;  // Image only
    anime_name?: string;  // GIF only
}

export interface NekoResponse {
    results: NekoAsset[]; // let API always return an array wrapped in the result
}