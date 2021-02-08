export default class GameScene extends Laya.Scene{

    
    createChildren(){
        super.createChildren();
        this.loadScene("GameScene");
    }

    onAwake(){

    }
}