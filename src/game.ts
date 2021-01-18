import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import { AmbientSound } from './ambient'
import { GemsMission } from './NPC/dialog'
import { playerHoldingKey, Cauldron, playerWentIn, keyIcon } from './cauldron'
import utils from '../node_modules/decentraland-ecs-utils/index'
import { TriggerBoxShape } from '../node_modules/decentraland-ecs-utils/triggers/triggerSystem'
import { PointerArrow } from './pointerArrow'
import { Dialog, NPC } from '../node_modules/@dcl/npc-utils/index'
import { Bell } from './bell'
import { Potion } from './potion'

Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
  //   log(`pos: `, Camera.instance.position)
  //   log(`rot: `, Camera.instance.rotation)
  log(
    `{ pos: new Vector3(`,
    Camera.instance.position.x,
    ',',
    Camera.instance.position.y,
    ',',
    Camera.instance.position.z,
    `) },`
  )
})

// Static stuff

let altars = new Entity()
altars.addComponent(new GLTFShape('models/plaza/altars.glb'))
altars.addComponent(
  new Transform({
    position: new Vector3(16 * 10, 0, 16 * 10),
  })
)
engine.addEntity(altars)

let arena = new Entity()
arena.addComponent(new GLTFShape('models/plaza/arena.glb'))
arena.addComponent(
  new Transform({
    position: new Vector3(16 * 10, 0, 16 * 10),
  })
)
engine.addEntity(arena)

let hades_mausoleum = new Entity()
hades_mausoleum.addComponent(new GLTFShape('models/plaza/hades_mausoleum.glb'))
hades_mausoleum.addComponent(
  new Transform({
    position: new Vector3(16 * 10, 0, 16 * 10),
  })
)
engine.addEntity(hades_mausoleum)

let mausoleum = new Entity()
mausoleum.addComponent(new GLTFShape('models/plaza/mausoleum.glb'))
mausoleum.addComponent(
  new Transform({
    position: new Vector3(16 * 10, 0, 16 * 10),
  })
)
engine.addEntity(mausoleum)

let stores = new Entity()
stores.addComponent(new GLTFShape('models/plaza/stores.glb'))
stores.addComponent(
  new Transform({
    position: new Vector3(16 * 10, 0, 16 * 10),
  })
)
engine.addEntity(stores)

let temples = new Entity()
temples.addComponent(new GLTFShape('models/plaza/temples.glb'))
temples.addComponent(
  new Transform({
    position: new Vector3(16 * 10, 0, 16 * 10),
  })
)
engine.addEntity(temples)

let terrain = new Entity()
terrain.addComponent(new GLTFShape('models/plaza/terrain.glb'))
terrain.addComponent(
  new Transform({
    position: new Vector3(16 * 10, 0, 16 * 10),
  })
)
engine.addEntity(terrain)

let zeuz_mausoleum = new Entity()
zeuz_mausoleum.addComponent(new GLTFShape('models/plaza/zeuz_mausoleum.glb'))
zeuz_mausoleum.addComponent(
  new Transform({
    position: new Vector3(16 * 10, 0, 16 * 10),
  })
)
engine.addEntity(zeuz_mausoleum)

export let chaman = new NPC(
  { position: new Vector3(62, 4, 71), rotation: Quaternion.Euler(0, 200, 0) },
  'models/game/npc.glb',
  () => {
    if (!chaman.introduced) {
      chaman.talk(GemsMission)
    } else if (!cauldron.ready) {
      let randomNum = Math.random()
      if (randomNum > 0.5) {
        chaman.talk(GemsMission, 'gemstillout1')
      } else {
        chaman.talk(GemsMission, 'gemstillout2')
      }
    } else {
      if (!cauldron.hasGems) {
        chaman.talk(GemsMission, 'cauldronreminder')
      } else if (!playerHoldingKey) {
        chaman.talk(GemsMission, 'getkey')
      }
    }
  },
  {
    portrait: 'images/npc.png',
    faceUser: true,
  }
)

export let cauldron = new Cauldron({
  position: new Vector3(59, 4, 71),
  rotation: Quaternion.Euler(0, 180, 0),
})

export let arrow = new PointerArrow(
  {
    position: new Vector3(0, 2.5, 0),
    scale: new Vector3(1.5, 1.5, 1.5),
  },
  chaman
)

/// Doors
let hades_door_left = new Entity()
hades_door_left.addComponent(new GLTFShape('models/plaza/hades_door_left.glb'))
hades_door_left.addComponent(
  new Transform({
    position: new Vector3(16 * 10, 0, 16 * 10),
  })
)
hades_door_left.addComponent(new Animator())
let doorLA = new AnimationState('Hades_DoorLeftAction', { looping: false })
hades_door_left.getComponent(Animator).addClip(doorLA)
engine.addEntity(hades_door_left)
doorLA.stop()

let hades_door_right = new Entity()
hades_door_right.addComponent(
  new GLTFShape('models/plaza/hades_door_right.glb')
)
hades_door_right.addComponent(
  new Transform({
    position: new Vector3(16 * 10, 0, 16 * 10),
  })
)
hades_door_right.addComponent(new Animator())
let doorRA = new AnimationState('Hades_DoorRight_Open', { looping: false })
hades_door_right.getComponent(Animator).addClip(doorRA)
engine.addEntity(hades_door_right)
doorRA.stop()

export let doorTrigger = new Entity()
doorTrigger.addComponent(
  new Transform({
    position: new Vector3(72, 8, 75),
  })
)
engine.addEntity(doorTrigger)
doorTrigger.addComponent(
  new utils.TriggerComponent(
    new TriggerBoxShape(new Vector3(5, 5, 5), Vector3.Zero()),
    null,
    null,
    null,
    null,
    () => {
      if (!playerHoldingKey || playerWentIn) return
      chaman.talk(GemsMission, 'finished')

      doorRA.play()
      doorLA.play()
      keyIcon.image.visible = false
      arrow.hide()
      playerWentIn = true
    }
  )
)

let sceneLimitsTrigger = new Entity()
sceneLimitsTrigger.addComponent(
  new Transform({
    position: new Vector3(160, 8, 160),
  })
)
engine.addEntity(sceneLimitsTrigger)
sceneLimitsTrigger.addComponent(
  new utils.TriggerComponent(
    new TriggerBoxShape(new Vector3(16 * 18.8, 50, 16 * 18.8), Vector3.Zero()),
    null,
    null,
    null,
    null,
    null,
    () => {
      log('walking out')
      if (!chaman.introduced || playerHoldingKey || playerWentIn) {
        return
      }
      chaman.talk(GemsMission, 'stay')
    }
  )
)

// Ambient sound

let town = new AmbientSound(
  { position: new Vector3(250, 5, 250) },
  'sounds/choir.mp3',
  0,
  true,
  0.4
)

let thunder = new AmbientSound(
  { position: new Vector3(75, 5, 75) },
  'sounds/thunder.mp3',
  0,
  true,
  0.6
)

let mainBell = new Bell({
  position: new Vector3(55, 4.2, 266),
  rotation: Quaternion.Euler(0, 45, 0),
  scale: new Vector3(3, 3, 3),
})

let potion = new Potion({
  position: new Vector3(30, 4.3, 32.6),
  scale: new Vector3(2, 2, 2),
})
