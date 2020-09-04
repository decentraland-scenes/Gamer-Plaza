import {
  gemsCounter,
  secondsCounter,
  minutesCounter,
  timerSeparaor,
  gemUIBck,
} from './gem'
import utils from '../node_modules/decentraland-ecs-utils/index'
import * as ui from '../node_modules/@dcl/ui-utils/index'
import { chaman, arrowNPC, doorTrigger } from './game'

export let playerHoldingKey: boolean = false
export let playerWentIn: boolean = false

export let keyIcon: ui.MediumIcon

export class Cauldron extends Entity {
  ready: boolean = false
  hasGems: boolean = false
  gem: Entity
  key: Entity
  animation: AnimationState
  gemAnimation: AnimationState
  keySpawnAnimation: AnimationState
  keyIdleAnimation: AnimationState
  constructor(position: TranformConstructorArgs) {
    super()
    this.addComponent(new GLTFShape('models/game/cauldron.glb'))
    this.getComponent(GLTFShape).visible = false
    this.addComponent(new Transform(position))

    // Reaction when clicked
    this.addComponent(
      new OnPointerDown(
        (e) => {
          this.addGems()
        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Drop Gems',
        }
      )
    )
    this.animation = new AnimationState('Cauldron_Action')
    this.animation.stop()
    this.addComponent(new Animator())
    this.getComponent(Animator).addClip(this.animation)
    engine.addEntity(this)

    this.gem = new Entity()
    this.gem.addComponent(new GLTFShape('models/game/gem_cauldron.glb'))
    this.gem.addComponent(
      new Transform({
        position: new Vector3(0, 0, 0),
      })
    )
    this.gem.getComponent(GLTFShape).visible = false
    this.gem.setParent(this)

    this.gemAnimation = new AnimationState(`gem_idle`, { looping: false })

    this.gem.addComponent(new Animator())
    this.gem.getComponent(Animator).addClip(this.gemAnimation)
    this.gemAnimation.stop()

    this.key = new Entity()
    this.key.addComponent(new GLTFShape('models/game/key.glb'))
    this.key.addComponent(
      new Transform({
        position: new Vector3(0, 0, 0),
      })
    )
    this.key.getComponent(GLTFShape).visible = false
    this.key.setParent(this)

    this.key.addComponent(
      new OnPointerDown(
        () => {
          // pick up
          this.key.getComponent(GLTFShape).visible = false
          keyIcon = new ui.MediumIcon('images/key.png', 0, 0, 128, 128, {
            sourceHeight: 256,
            sourceWidth: 256,
          })
          playerHoldingKey = true
          //arrowNPC.setParent(doorTrigger)
        },
        {
          hoverText: 'Pick up',
        }
      )
    )

    this.keyIdleAnimation = new AnimationState(`Key_Idle`)
    this.keySpawnAnimation = new AnimationState(`Key_Action`, {
      looping: false,
    })

    this.key.addComponent(new Animator())
    this.key.getComponent(Animator).addClip(this.keyIdleAnimation)
    this.key.getComponent(Animator).addClip(this.keySpawnAnimation)
    this.keyIdleAnimation.stop()
    this.keySpawnAnimation.stop()
  }
  show() {
    this.getComponent(GLTFShape).visible = true
  }
  hide() {
    this.getComponent(GLTFShape).visible = false
  }
  addGems() {
    if (this.ready && !this.hasGems) {
      this.hasGems = true
      this.gemAnimation.play()
      this.gem.getComponent(GLTFShape).visible = true
      this.animation.play()
      this.gem.addComponentOrReplace(
        new utils.Delay(4000, () => {
          this.key.getComponent(GLTFShape).visible = true
          this.keyIdleAnimation.stop()
          this.keySpawnAnimation.play()
          this.key.addComponentOrReplace(
            new utils.Delay(2500, () => {
              chaman.talk(13)
              this.keySpawnAnimation.stop()
              this.keyIdleAnimation.play()
            })
          )
        })
      )

      gemsCounter.uiText.visible = false
      secondsCounter.uiText.visible = false
      minutesCounter.uiText.visible = false
      timerSeparaor.uiText.visible = false
      gemUIBck.image.visible = false
    }
  }
}
