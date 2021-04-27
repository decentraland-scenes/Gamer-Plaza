import * as utils from '@dcl/ecs-scene-utils'
import * as ui from '@dcl/ui-scene-utils'

import { cauldron, chaman, arrow, progressInQuest, client } from './quest'
import { GemsMission } from './NPC/dialog'
import { addVases, removeVases } from './vase'

let totalGems = 10
let firstTime: boolean = true

export let gemUIBck = new ui.LargeIcon('images/ui-gem.png', -20, 50, 256, 128, {
  sourceWidth: 512,
  sourceHeight: 256,
})
gemUIBck.image.visible = false
export let gemsCounter = new ui.UICounter(
  0,
  -135,
  105,
  Color4.Purple(),
  48,
  true
)
export let secondsCounter = new ui.UICounter(66, -14, 49, Color4.Black())
export let timerSeparaor = new ui.CornerLabel(':', -39, 49, Color4.Black())
export let minutesCounter = new ui.UICounter(6, -64, 49, Color4.Black())
gemsCounter.uiText.font = ui.SFHeavyFont
gemsCounter.uiText.visible = false
secondsCounter.uiText.visible = false
timerSeparaor.uiText.visible = false
minutesCounter.uiText.visible = false

export let timer: CountdownSystem

export function startGemUI() {
  cauldron.show()
  addVases()
  gemUIBck.image.visible = true
  gemsCounter.uiText.visible = true
  secondsCounter.uiText.visible = true
  timerSeparaor.uiText.visible = true
  minutesCounter.uiText.visible = true
  if (firstTime == true) {
    timer = new CountdownSystem()
    engine.addSystem(timer)
    firstTime = false
  } else {
    gemsCounter.set(0)
    secondsCounter.set(66)
    minutesCounter.set(6)
    timer.running = true
  }
  client.makeProgress('c07a44ba-4aa7-47ae-a29a-82ecfb2129b7', {
    type: 'numeric',
    operation: 'set',
    amount: 0,
  })
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
    chaman.talk(GemsMission, 'success')
    cauldron.ready = true
    arrow.move(cauldron)
  }
  progressInQuest('c07a44ba-4aa7-47ae-a29a-82ecfb2129b7', true)
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
          resetGame()
        } else {
          secondsCounter.set(59)
          minutesCounter.decrease()
        }
      }
    }
  }
}

export function resetGame() {
  removeVases()
  cauldron.hide()
  gemsCounter.set(0)
  secondsCounter.set(0)
  chaman.talk(GemsMission, 'tooslow')
  chaman.introduced = false
  arrow.move(chaman)

  let dummyEnt = new Entity()
  engine.addEntity(dummyEnt)
  dummyEnt.addComponent(
    new utils.Delay(6000, () => {
      gemUIBck.image.visible = false
      gemsCounter.uiText.visible = false
      secondsCounter.uiText.visible = false
      timerSeparaor.uiText.visible = false
      minutesCounter.uiText.visible = false
    })
  )

  client.makeProgress('c07a44ba-4aa7-47ae-a29a-82ecfb2129b7', {
    type: 'numeric',
    operation: 'set',
    amount: 0,
  })
}
