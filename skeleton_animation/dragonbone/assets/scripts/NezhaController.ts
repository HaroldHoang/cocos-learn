import {
  _decorator,
  Component,
  SystemEvent,
  EventKeyboard,
  KeyCode,
  input,
  Input,
  dragonBones,
  math,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("NezhaController")
export class NezhaController extends Component {
  @property(dragonBones.ArmatureDisplay)
  armatureDisplay: dragonBones.ArmatureDisplay = null!;

  private isLiving = true;
  private keyState: { [key: string]: boolean } = {};
  private speed = 10;
  private addSpeed = 5;

  onLoad() {
    console.log(this.isLiving);
    this.armatureDisplay.playAnimation("idle", 0);
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  onKeyDown(event: EventKeyboard) {
    this.keyState[event.keyCode] = true;
    if (event.keyCode === KeyCode.SPACE) {
      this.armatureDisplay.playAnimation("dead", 1);
      this.isLiving = false;
      console.log(this.isLiving);
    } else {
      this.isLiving = true;
      switch (event.keyCode) {
        case KeyCode.KEY_U:
          this.armatureDisplay.playAnimation("attack1", 1);
          break;
        case KeyCode.KEY_I:
          this.armatureDisplay.playAnimation("attack1_1", 1);
          break;
        case KeyCode.KEY_O:
          this.armatureDisplay.playAnimation("attack1_2", 1);
          break;
        case KeyCode.KEY_P:
          this.armatureDisplay.playAnimation("qingzhu", 1);
          break;
        case KeyCode.ENTER:
          this.armatureDisplay.playAnimation("skill1", 1);
          break;
      }
    }
  }

  onKeyUp(event: EventKeyboard) {
    this.keyState[event.keyCode] = false;
  }

  update() {
    if (this.isLiving === true) {
      this.armatureDisplay.once(
        dragonBones.EventObject.COMPLETE,
        () => {
          if (this.isLiving === true)
            this.armatureDisplay.playAnimation("idle", 0);
        },
        this
      );

      if (this.keyState[KeyCode.KEY_D] || this.keyState[KeyCode.ARROW_RIGHT])
        this.moveRight();
      else if (
        this.keyState[KeyCode.ARROW_LEFT] ||
        this.keyState[KeyCode.KEY_A]
      )
        this.moveLeft();
    }
  }
  moveRight() {
    this.node.setRotationFromEuler(0, 0, 0);
    var currentPosition = this.node.getPosition();
    if (
      this.keyState[KeyCode.SHIFT_LEFT] ||
      this.keyState[KeyCode.SHIFT_RIGHT]
    ) {
      this.armatureDisplay.playAnimation("qingzhu", 1);
      currentPosition.add3f(this.speed + this.addSpeed, 0, 0);
    } else {
      this.armatureDisplay.playAnimation("run", 1);
      currentPosition.add3f(this.speed, 0, 0);
    }

    this.node.setPosition(currentPosition);
  }

  moveLeft() {
    this.node.setRotationFromEuler(0, 180, 0);
    var currentPosition = this.node.getPosition();
    if (
      this.keyState[KeyCode.SHIFT_LEFT] ||
      this.keyState[KeyCode.SHIFT_RIGHT]
    ) {
      this.armatureDisplay.playAnimation("qingzhu", 1);
      currentPosition.add3f(-this.speed - this.addSpeed, 0, 0);
    } else {
      this.armatureDisplay.playAnimation("run", 1);
      currentPosition.add3f(-this.speed, 0, 0);
    }

    this.node.setPosition(currentPosition);
  }

  onDestroy() {
    this.node.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }
}
