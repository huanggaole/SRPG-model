import Map from "../data/Map"
export default class MapScript extends Laya.Script{
    private terrainImages:Laya.Image[];

    private lastX:number;
    private lastY:number;
    private ifMove:boolean;
    
    constructor(){
        super();
        this.terrainImages = [];
        let terrainpaths = [
            "comp/terrain_deepwater.png",
            "comp/terrain_shallowwater.png",
            "comp/terrain_plain.png",
            "comp/terrain_grass.png",
            "comp/terrain_road.png"];
        for(let i = 0; i < terrainpaths.length; i++){
            this.terrainImages.push(new Laya.Image(terrainpaths[i]));
        }
    }

    onStart(){
        

    }

    onRefresh(){
        let image = this.owner as Laya.Image;
        image.graphics.clear();
        image.size(Map.width * Map.tilewidth, Map.height * Map.tileheight);
        for(let i = 0; i < Map.height; i++){
            for(let j = 0; j < Map.width; j++){
                image.graphics.drawImage(this.terrainImages[Map.terrianarray[i][j]].source,j * Map.tilewidth,i * Map.tileheight,Map.tilewidth,Map.tileheight);
            }
        }
    }

    onMouseDown(){
        this.lastX = Laya.stage.mouseX;
        this.lastY = Laya.stage.mouseY;
        this.ifMove = true;
    }

    onMouseUp(){
        this.ifMove = false;
        const image = this.owner as Laya.Image;
        let roundx = Math.round(image.pivotX / Map.tilewidth);
        let roundy = Math.round(image.pivotY / Map.tileheight)
        if(roundx < 0) roundx = 0;
        if(roundx >= Map.width) roundx = Map.width - 1;
        if(roundy < 0) roundy = 0;
        if(roundy >= Map.height) roundy = Map.height - 1;
        let newx = roundx * Map.tilewidth;
        let newy = roundy * Map.tileheight;
        Laya.Tween.to(image,{pivotX:newx, pivotY:newy}, 100);
    }

    onMouseOut(){
        this.onMouseUp();
    }

    onMouseMove(){
        if(this.ifMove){
            let currentX = Laya.stage.mouseX;
            let currentY = Laya.stage.mouseY;
            let image = this.owner as Laya.Image;
            image.pivotX -= (currentX - this.lastX) / image.scaleX;
            image.pivotY -= (currentY - this.lastY) / image.scaleY;
            
            this.lastX = currentX;
            this.lastY = currentY;
        }
    }
}