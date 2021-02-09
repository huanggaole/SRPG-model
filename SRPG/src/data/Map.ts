enum TerrianType{
    DeepWater,
    ShallowWater,
    Plain,
    Grass,
    Road
}
enum SurfaceType{
    None,
    Tree,
    Rock
}
export default class Map{
    public static tilewidth = 16;
    public static tileheight = 16;
    public static height:number;
    public static width:number;
    public static terrianarray = [];
    public static surfacearray = [];

    static init(_height:number,_width:number,_tarray:any[],_sarray:any[]){
        this.height = _height;
        this.width = _width;
        this.terrianarray = _tarray;
        this.surfacearray = _sarray;
    }

    static initlevel1(){
        this.height = 50;
        this.width = 100;
        this.terrianarray = [];
        this.surfacearray = [];
        for(let i = 0; i < this.height; i++){
            let ttemprow = [];
            let stemprow = [];
            for(let j = 0; j < this.width; j++){
                ttemprow.push(TerrianType.Grass);
                stemprow.push(SurfaceType.None);
            }
            this.terrianarray.push(ttemprow);
            this.surfacearray.push(stemprow);
        }
    }
}