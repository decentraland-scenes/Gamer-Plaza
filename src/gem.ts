import * as ui from '../node_modules/@dcl/ui-utils/index'
import utils from '../node_modules/decentraland-ecs-utils/index'

import { cauldron, chaman, arrowNPC } from './game'
import { TimerSystem } from '../node_modules/@dcl/ui-utils/utils/timerSystem'
import { addVases, removeVases } from './vase'
import { SFHeavyFont } from '../node_modules/@dcl/ui-utils/utils/default-ui-comopnents'

let totalGems = 10
let firstTime: boolean = true

export let gemUIBck: ui.LargeIcon
export let gemsCounter: ui.UICounter
export let secondsCounter: ui.UICounter
export let timerSeparaor: ui.CornerLabel
export let minutesCounter: ui.UICounter

export let timer: CountdownSystem

export function startGemUI() {
  cauldron.show()
  addVases()
  if (firstTime == true) {
    gemUIBck = new ui.LargeIcon('images/ui-gem.png', -20, 50, 256, 128, {
      sourceWidth: 512,
      sourceHeight: 256,
    })
    //let gemsLabel = new ui.CornerLabel('Gems found:', -100, 50, Color4.Purple())
    gemsCounter = new ui.UICounter(0, -135, 105, Color4.Purple(), 48, true)
    gemsCounter.uiText.font = SFHeavyFont
    secondsCounter = new ui.UICounter(0, -14, 49, Color4.Black())
    timerSeparaor = new ui.CornerLabel(':', -39, 49, Color4.Black())
    minutesCounter = new ui.UICounter(5, -64, 49, Color4.Black())
    timer = new CountdownSystem()
    engine.addSystem(timer)
    firstTime = false
  } else {
    gemsCounter.set(0)
    secondsCounter.set(0)
    minutesCounter.set(5)
    timer.running = true
  }
}

export function findGem(vase: Entity) {
  idleAnim.stop()
  gem.setParent(vase)
  spawnAnim.stop()
  spawnAnim.play()
  gem.addComponentOrReplace(
    new utils.Delay(2500, () => {
      spawnAnim.stop()
      idleAnim.play()
    })
  )
  undergronundDummy.addComponentOrReplace(
    new utils.Delay(4000, () => {
      gem.setParent(undergronundDummy)
    })
  )
  gemsCounter.increase()
  if (gemsCounter.read() >= totalGems) {
    timer.running = false
    chaman.talk(11)
    cauldron.ready = true
    chaman.solvedProblem = true
    arrowNPC.setParent(cauldron)
    arrowNPC.getComponent(GLTFShape).visible = true
  }
}

let undergronundDummy = new Entity()
undergronundDummy.addComponent(
  new Transform({
    position: new Vector3(5, -3, 5),
  })
)
engine.addEntity(undergronundDummy)

//add gem
let gem = new Entity()
gem.addComponent(new GLTFShape('models/game/gem.glb'))
gem.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(gem)
gem.setParent(undergronundDummy)
let spawnAnim = new AnimationState(`gem_action`, { looping: false })
let idleAnim = new AnimationState(`gem_idle`)

gem.addComponent(new Animator())
gem.getComponent(Animator).addClip(spawnAnim)
gem.getComponent(Animator).addClip(idleAnim)
spawnAnim.stop()

class CountdownSystem implements ISystem {
  running: boolean = true
  timer: number = 1
  update(dt: number) {
    if (this.running == false) return
    this.timer -= dt
    if (this.timer <= 0) {
      this.timer = 1
      secondsCounter.decrease()
      if (secondsCounter.read() < 0) {
        if (minutesCounter.read() <= 0) {
          // TIME UP

          this.running = false
          removeVases()
          cauldron.hide()
          gemsCounter.set(0)
          secondsCounter.set(0)
          chaman.talk(10)
          chaman.introduced = false
          arrowNPC.setParent(chaman)
          arrowNPC.getComponent(GLTFShape).visible = true
        } else {
          secondsCounter.set(59)
          minutesCounter.decrease()
        }
      }
    }
  }
}
