import { _decorator, Component, EventKeyboard, EventMouse, input, Input, KeyCode, Node, sp, SystemEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    @property(sp.Skeleton)
    spineSkeleton: sp.Skeleton | null = null;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.showAnimation, this);
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.spineSkeleton.setAnimation(0, "idle", true);
    }

    showAnimation(event: EventKeyboard) {
        if (event.keyCode === KeyCode.SPACE) {
            this.spineSkeleton.clearTrack(0);
            this.spineSkeleton.setAnimation(1, "die", false);
        }
        else {
            this.spineSkeleton.setAnimation(0, "idle", true);
            switch (event.keyCode) {
                case KeyCode.KEY_U:
                    this.spineSkeleton.setAnimation(1, "attack", false);
                    break;
                case KeyCode.KEY_I:
                    this.spineSkeleton.setAnimation(1, "attack2", false);
                    break;
                case KeyCode.KEY_O:
                    this.spineSkeleton.setAnimation(1, "attack3", false);
                    break;
                case KeyCode.KEY_P:
                    this.spineSkeleton.setAnimation(1, "get-hit", false);
                    break;
            }
        }
    }

    onMouseDown(event: EventMouse){
        if(event.getButton() === 0){
            this.spineSkeleton.setAnimation(0, "idle", true);
            this.spineSkeleton.setAnimation(1, "get-hit", false); 
        }
    }

}


