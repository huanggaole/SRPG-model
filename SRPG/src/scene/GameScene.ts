import Map from "../data/Map"
import MapScript from "../script/MapScript";
export default class GameScene extends Laya.Scene{
    private mapImage:Laya.Image;
    private mapScript:MapScript;
    
    private scaleRadio:Laya.RadioGroup;
    private cursor:Laya.Image;
    createChildren(){
        super.createChildren();
        this.loadScene("GameScene");
    }

    onScaleChange(){
        if(this.scaleRadio.selectedIndex == 0){ this.mapImage.scale(1,1); this.cursor.scale(1,1);}
        if(this.scaleRadio.selectedIndex == 1){ this.mapImage.scale(2,2); this.cursor.scale(2,2);}
        if(this.scaleRadio.selectedIndex == 2){ this.mapImage.scale(4,4); this.cursor.scale(4,4);}
        
    }

    onAwake(){
        this.mapScript = this.mapImage.getComponent(MapScript);
        this.scaleRadio.on(Laya.Event.CHANGE, this, this.onScaleChange);

        Map.initlevel1();
        this.mapScript.onRefresh();
    }


}