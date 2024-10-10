import { _decorator, Component, screen, Label, Button, sp } from "cc";
const { ccclass, property } = _decorator;

import { FullScreenManager } from "../singleton/ScreenManager";
import { RotateManager } from "../singleton/ScreenManager";

@ccclass("HomeController")
export class HomeController extends Component {
    @property(sp.Skeleton)
    monter: sp.Skeleton = null;

    @property(Label)
    lblInstruction: Label = null;

    @property(Button)
    btnFullScreen: Button = null;

    @property(Label)
    lblBtnFullScreen: Label = null;

    @property(Button)
    btnRotate: Button = null;

    @property(Label)
    lblBtnRotate: Label = null;

    private isFullScreen = false;
    private fullScreenManager = FullScreenManager.getInstance();
    private rotateManager = RotateManager.getInstance();

    onLoad() {
        this.btnFullScreen.node.on(Button.EventType.CLICK, this.changeStateScreen, this);
        this.btnRotate.node.on(Button.EventType.CLICK, this.changeRotation, this);
        screen.on("fullscreen-change", this.handleFullScreen, this);
    }

    changeStateScreen = () => this.fullScreenManager.toggleFullScreen();

    handleFullScreen() {
        this.isFullScreen = !this.isFullScreen;
        this.lblBtnFullScreen.string = this.isFullScreen ? "Exit" : "Full Screen";
    }

    changeRotation() {
        this.rotateManager.rotateScreen(false);
        this.monter.node.setRotationFromEuler(0, 0, 90);
        this.lblInstruction.node.setRotationFromEuler(0, 0, 90);
        this.btnFullScreen.node.setRotationFromEuler(0, 0, 90);
        this.btnRotate.node.setRotationFromEuler(0, 0, 90);

        this.monter.node.setScale(0.15, 0.15);
        this.monter.node.setPosition(30, -50);
        this.btnFullScreen.node.setPosition(-600, 290, 0);
        this.btnRotate.node.setPosition(-600, 170, 0);
        
		this.lblInstruction.string =
            "U: attack1       I: attack2\nO: attack3       P: get-hit        Space: die\ndefault: idle";
		this.lblInstruction.lineHeight = 60;
        this.lblInstruction.node.setPosition(470, -20, 0);

    }
    handleRotation(width: number, height: number) {
        console.log("Window resized:", width, height);
    }

    onDestroy(): void {
        this.btnFullScreen.node.off(Button.EventType.CLICK, this.changeStateScreen, this);
        this.btnRotate.node.off(Button.EventType.CLICK, this.changeRotation, this);
        screen.off("fullscreen-change", this.handleFullScreen, this);
    }

    update(){

    }

    
    
    
}