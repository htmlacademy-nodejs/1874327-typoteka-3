class CategoriesService
{
    constructor(publications)
    {
          this._publications = publications;
    }
  
    findAll()
    {
        const categories = this._publications.reduce((acc, publication) =>
        {
            acc.add(publication.category);
            console.log(publication.category);
            return acc;
        }, new Set());
  
        return [...categories];
    }
}
  
module.exports = CategoriesService;