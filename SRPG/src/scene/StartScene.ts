import GameScene from "./GameScene";

export default class StartScene extends Laya.Scene{
    private startBtn:Laya.Button;
    
    createChildren(){
        super.createChildren();
        this.loadScene("StartScene");
    }

    onAwake(){
        const gamescene = new GameScene();
        this.startBtn.on(Laya.Event.CLICK, this, ()=>{
            Laya.stage.addChild(gamescene);
        })
    }
}