export class Repository {

    private linksCount: number = 1;

    public links = [{
        id: 'link-0',
        description: 'Beschreibung',
        url: 'https://www.howtographql.com'
    }];

    public createPost(description, url) {
        this.links.push({
            id : `link-${this.linksCount++}`,
            url,
            description
        }); 
        return this.links.slice(-1)[0];  // Return last inserted Link element
    };

    public findLinkById(id) {
        let result: any = null;
        this.links.forEach((el) => {
            if(el.id === id) {
                result = el;
            }
        });
        return result;
    };

    public findLinkIdx(id) {
        let result: any = null;
        this.links.forEach((el, idx) => {
            if(el.id === id) {
                result = idx;
            }
        });
        return result;
    };

    public updateLink(id, description, url) {
        let idx: string = this.findLinkIdx(id);
        if(idx === null) {
            return new Error(`Unknown link`);
        }
        this.links[idx] = {
            id,
            description,
            url
        };
        return this.links[idx];
    };

    public deleteLink(id) {
        let idx = this.findLinkIdx(id);
        if(idx === null) {
            return new Error(`Unknown link`);
        }
        let result = this.links[idx];   // Cache element 
        this.links.splice(idx, 1);      // Delete from array collection
        return result;
    }
}
