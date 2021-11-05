'use strict';

class CategoriesService {
    constructor(publications) {
          this._publications = publications;
    }
  
    findAll() {
        const categories = this._publications.reduce((acc, publication) => {
            acc.add(publication.category);
            return acc;
        }, new Set());
  
        return [...categories];
    }

    findAllWithCounts() {
        const categories = this._publications.reduce((acc, publication) => {
            if (acc.has(publication.category)) {
                acc.get(publication.category).count++;
            }
            else {
                acc.set(publication.category, { count: 1 });
            }

            return acc;
        }, new Map());

        let categoriesRes = [];
        categories.forEach((value, key) => categoriesRes.push({ name: key, count: value.count }));

        return categoriesRes;
    }
}
  
module.exports = CategoriesService;