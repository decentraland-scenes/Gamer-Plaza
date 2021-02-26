import { AmbientSound } from './ambient'
import { handleQuests } from './quest'

// Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
//   //   log(`pos: `, Camera.instance.position)
//   //   log(`rot: `, Camera.instance.rotation)
//   log(
//     `{ pos: new Vector3(`,
//     Camera.instance.position.x,
//     ',',
//     Camera.instance.position.y,
//     ',',
//     Camera.instance.position.z,
//     `) },`
//   )
// })

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

handleQuests()
