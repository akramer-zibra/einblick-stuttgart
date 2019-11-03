export interface Scraper<T> {
    scrape($: CheerioStatic): Array<T>
}

export interface DataClient {}

export interface Resolver {}