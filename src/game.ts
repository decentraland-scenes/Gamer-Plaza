import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import { AmbientSound } from './ambient'
import { NPC } from './NPC/npc'
import { GemsMission } from './NPC/dialog'
import { playerHoldingKey, Cauldron } from './cauldron'
import utils from '../node_modules/decentraland-ecs-utils/index'
import { TriggerBoxShape } from '../node_modules/decentraland-ecs-utils/triggers/triggerSystem'

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

export let chaman = new NPC(
  { position: new Vector3(62, 4, 71), rotation: Quaternion.Euler(0, 200, 0) },
  new GLTFShape('models/game/npc.glb'),
  GemsMission,
  () => {
    if (!chaman.introduced) {
      chaman.talk(0)
      //cauldron.show()
      // addVases()
    } else if (!chaman.solvedProblem) {
      let randomNum = Math.random()
      if (randomNum > 0.5) {
        chaman.talk(8)
      } else {
        chaman.talk(9)
      }
    } else if (chaman.solvedProblem) {
      if (!cauldron.hasGems) {
        chaman.talk(12)
      } else if (!playerHoldingKey) {
        chaman.talk(14)
      }
    }
  },
  'images/npc.png'
)

export let cauldron = new Cauldron({
  position: new Vector3(59, 4, 71),
  rotation: Quaternion.Euler(0, 180, 0),
})

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

let doorTrigger = new Entity()
doorTrigger.addComponent(
  new Transform({
    position: new Vector3(72, 8, 75),
  })
)
engine.addEntity(doorTrigger)
doorTrigger.addComponent(
  new utils.TriggerComponent(
    new TriggerBoxShape(new Vector3(4, 4, 4), Vector3.Zero()),
    null,
    null,
    null,
    null,
    () => {
      if (!playerHoldingKey) return
      chaman.talk(15)

      doorRA.play()
      doorLA.play()
    }
  )
)
