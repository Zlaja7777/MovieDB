export class ShowModel{
    constructor(){}

    public poster_path: string;
    public overview: string;
    public title: string;
   
    setShowData(poster_path: string, overview: string
        , title: string){
            
            this.poster_path = poster_path;
            this.overview = overview;
            this.title = title;
        
        }
}