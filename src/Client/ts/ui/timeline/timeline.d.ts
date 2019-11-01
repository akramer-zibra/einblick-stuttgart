export interface TimelineData {
    events: TimelineSlide[],
    title?: TimelineSlide,
    eras?: TimelineEra[],
    scale?: string
}

export interface TimelineEra {
    start_date: TimelineDate,
    end_date: TimelineDate
    text?: TimelineText
}

export interface TimelineSlide {
    start_date: TimelineDate,
    end_date?: TimelineDate,
    text: TimelineText,
    media?: TimelineMedia,
    group?: string,
    display_date?: string,
    background?: {
        url: string
        color: string
    },
    autolink?: boolean,
    unique_id?: string
}

export interface TimelineText {
    headline?: string,
    text?: string
}

export interface TimelineMedia {
    url: string,
    caption?: string,
    credit?: string,
    thumbnail?: string,
    alt?: string,
    link?: string,
    link_target?: string
}


export interface TimelineDate {
    year: number,
    month?: number,
    day?: number
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
    display_date?: string
}
