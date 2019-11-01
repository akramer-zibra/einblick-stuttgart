export class SearchHistory {

    /** Historie von Suchanfragen */
    private history: string[] = [];

    /**
     * Methode übernimmt den übergebenen Suchtext in die Historie
     * @param text 
     */
    remember(text: string) {
        this.history.push(text);
    }

    /**
     * Methode gibt den zuletzt verwendeten Suchtext zurück
     * oder null, falls noch keine Suche gemacht wurde
     */
    last(): string|null {
        if(this.history.length === 0) { return null; }
        return this.history[this.history.length];
    }
}