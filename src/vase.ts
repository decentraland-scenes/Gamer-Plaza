import { findGem } from './gem'
import { arrow, chaman } from './game'

export class Vase extends Entity {
  constructor(position: Vector3, hasGem?: boolean) {
    super()

    this.addComponent(new GLTFShape('models/game/v_0.glb'))

    let randomRotation = Math.random() * 365

    this.addComponent(
      new Transform({
        position: new Vector3(position.x, position.y - 1.671, position.z),
        rotation: Quaternion.Euler(0, randomRotation, 0),
      })
    )
    //this.getComponent(Transform).translate(new Vector3(0, -1.671, 0))

    engine.addEntity(this)
    this.addComponent(
      new OnPointerDown(() => {
        this.explode()
        if (hasGem) {
          findGem(this)
        }
      })
    )
  }

  explode() {
    this.removeComponent(GLTFShape)

    v1.stop()
    v2.stop()
    v3.stop()
    v4.stop()
    v5.stop()
    v6.stop()
    v7.stop()
    v8.stop()
    v9.stop()
    v10.stop()
    v11.stop()
    v12.stop()
    v13.stop()
    v_01.setParent(this)
    v_02.setParent(this)
    v_03.setParent(this)
    v_04.setParent(this)
    v_05.setParent(this)
    v_06.setParent(this)
    v_07.setParent(this)
    v_08.setParent(this)
    v_09.setParent(this)
    v_10.setParent(this)
    v_11.setParent(this)
    v_12.setParent(this)
    v_13.setParent(this)

    v1.play()
    v2.play()
    v3.play()
    v4.play()
    v5.play()
    v6.play()
    v7.play()
    v8.play()
    v9.play()
    v10.play()
    v11.play()
    v12.play()
    v13.play()
  }
}

let vasePositions: { pos: Vector3; gem?: boolean }[] = [
  { pos: new Vector3(80.364990234375, 4.370688438415527, 41.86681365966797) },
  {
    pos: new Vector3(81.842529296875, 4.1735968589782715, 38.18090057373047),
    gem: true,
  },
  { pos: new Vector3(143.048828125, 5.87366247177124, 108.13896942138672) },
  { pos: new Vector3(142.9747314453125, 5.87366247177124, 115.05728149414062) },
  {
    pos: new Vector3(145.34619140625, 5.87366247177124, 119.9117431640625),
    gem: true,
  },
  { pos: new Vector3(97.65234375, 5.87366247177124, 172.2945785522461) },
  { pos: new Vector3(98.5067138671875, 5.87366247177124, 170.09263801574707) },
  {
    pos: new Vector3(95.5870361328125, 5.87366247177124, 170.2343921661377),
    gem: true,
  },
  { pos: new Vector3(12.91796875, 4.123523235321045, 41.246620178222656) },
  {
    pos: new Vector3(12.603271484375, 4.370865821838379, 45.413795471191406),
    gem: true,
  },
  { pos: new Vector3(16.4207763671875, 4.037629127502441, 45.076377868652344) },
  { pos: new Vector3(15.2972412109375, 4.079627990722656, 48.94328308105469) },
  { pos: new Vector3(39.4373779296875, 1.8490099906921387, 95.51080703735352) },
  {
    pos: new Vector3(42.20947265625, 2.062817335128784, 96.5025405883789),
    gem: true,
  },
  { pos: new Vector3(46.4910888671875, 2.4291863441467285, 174.0976848602295) },
  {
    pos: new Vector3(89.17529296875, 5.760749816894531, 245.75502014160156),
    gem: true,
  },
  { pos: new Vector3(47.5859375, 3.044893741607666, 170.2263240814209) },
  {
    pos: new Vector3(52.1707763671875, 3.044893741607666, 167.82369804382324),
    gem: true,
  },
  { pos: new Vector3(92.0013427734375, 4.090640068054199, 192.96806716918945) },
  { pos: new Vector3(94.4620361328125, 4.1842498779296875, 196.5730209350586) },
  { pos: new Vector3(98.81298828125, 4.091554641723633, 196.10015106201172) },
  {
    pos: new Vector3(75.6676025390625, 4.158233642578125, 282.89076232910156),
    gem: true,
  },
  { pos: new Vector3(69.835205078125, 3.7738494873046875, 284.38824462890625) },
  { pos: new Vector3(71.2049560546875, 3.7738494873046875, 288.7763366699219) },
  { pos: new Vector3(129.0906982421875, 4.074855327606201, 264.4117660522461) },
  {
    pos: new Vector3(131.0064697265625, 4.5320587158203125, 253.43987274169922),
  },
  {
    pos: new Vector3(126.606201171875, 4.383317947387695, 252.38412475585938),
    gem: true,
  },
  { pos: new Vector3(91.014892578125, 10.725659370422363, 217.64810943603516) },
  { pos: new Vector3(92.8450927734375, 10.733537673950195, 221.0294952392578) },
  { pos: new Vector3(84.44580078125, 19.75499725341797, 188.04117584228516) },
  {
    pos: new Vector3(89.1937255859375, 19.75499725341797, 189.32820510864258),
    gem: true,
  },
  { pos: new Vector3(91.61083984375, 19.75499725341797, 193.26624298095703) },
]

let vases: Vase[] = [] //new Array(vasePositions.length)
let demoVase: Vase

export function addVases() {
  demoVase = new Vase(
    new Vector3(69.4803466796875, 5.671645641326904, 61.69293212890625)
  )
  arrow.move(demoVase, new Vector3(0, 45, 0))
  demoVase.addComponentOrReplace(
    new OnPointerDown(() => {
      demoVase.explode()
      arrow.hide()
      chaman.talk(19)
    })
  )

  vases = []
  for (let vase of vasePositions) {
    let thisVase = new Vase(vase.pos, vase.gem)
    vases.push(thisVase)
  }
}

export function removeVases() {
  for (let vase of vases) {
    engine.removeEntity(vase)
  }
  vases = []
  engine.removeEntity(demoVase)
}

/// REUSABLE EXPLODING SECTIONS

let undergronundDummy = new Entity()
undergronundDummy.addComponent(
  new Transform({
    position: new Vector3(5, -2, 5),
  })
)
engine.addEntity(undergronundDummy)

//add v_01
let v_01 = new Entity()
v_01.addComponent(new GLTFShape('models/game/v_01.glb'))
v_01.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_01)
let v1 = new AnimationState('Action.052', { looping: false })
v_01.addComponent(new Animator()).addClip(v1)
v_01.setParent(undergronundDummy)

//add v_02
let v_02 = new Entity()
v_02.addComponent(new GLTFShape('models/game/v_02.glb'))
v_02.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_02)
let v2 = new AnimationState('Action.053', { looping: false })
v_02.addComponent(new Animator()).addClip(v2)
v_02.setParent(undergronundDummy)

//add v_03
let v_03 = new Entity()
v_03.addComponent(new GLTFShape('models/game/v_03.glb'))
v_03.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_03)
let v3 = new AnimationState('Action.054', { looping: false })
v_03.addComponent(new Animator()).addClip(v3)
v_03.setParent(undergronundDummy)

//add v_04
let v_04 = new Entity()
v_04.addComponent(new GLTFShape('models/game/v_04.glb'))
v_04.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_04)
let v4 = new AnimationState('Action.055', { looping: false })
v_04.addComponent(new Animator()).addClip(v4)
v_04.setParent(undergronundDummy)

//add v_05
let v_05 = new Entity()
v_05.addComponent(new GLTFShape('models/game/v_05.glb'))
v_05.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_05)
let v5 = new AnimationState('Action.056', { looping: false })
v_05.addComponent(new Animator()).addClip(v5)
v_05.setParent(undergronundDummy)

//add v_06
let v_06 = new Entity()
v_06.addComponent(new GLTFShape('models/game/v_06.glb'))
v_06.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_06)
let v6 = new AnimationState('Action.057', { looping: false })
v_06.addComponent(new Animator()).addClip(v6)
v_06.setParent(undergronundDummy)

//add v_07
let v_07 = new Entity()
v_07.addComponent(new GLTFShape('models/game/v_07.glb'))
v_07.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_07)
let v7 = new AnimationState('Action.058', { looping: false })
v_07.addComponent(new Animator()).addClip(v7)
v_07.setParent(undergronundDummy)

//add v_08
let v_08 = new Entity()
v_08.addComponent(new GLTFShape('models/game/v_08.glb'))
v_08.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_08)
let v8 = new AnimationState('Action.059', { looping: false })
v_08.addComponent(new Animator()).addClip(v8)
v_08.setParent(undergronundDummy)

//add v_09
let v_09 = new Entity()
v_09.addComponent(new GLTFShape('models/game/v_09.glb'))
v_09.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_09)
let v9 = new AnimationState('Action.060', { looping: false })
v_09.addComponent(new Animator()).addClip(v9)
v_09.setParent(undergronundDummy)

//add v_10
let v_10 = new Entity()
v_10.addComponent(new GLTFShape('models/game/v_10.glb'))
v_10.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_10)
let v10 = new AnimationState('Action.061', { looping: false })
v_10.addComponent(new Animator()).addClip(v10)
v_10.setParent(undergronundDummy)

//add v_11
let v_11 = new Entity()
v_11.addComponent(new GLTFShape('models/game/v_11.glb'))
v_11.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_11)
let v11 = new AnimationState('Action.062', { looping: false })
v_11.addComponent(new Animator()).addClip(v11)
v_11.setParent(undergronundDummy)

//add v_12
let v_12 = new Entity()
v_12.addComponent(new GLTFShape('models/game/v_12.glb'))
v_12.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_12)
let v12 = new AnimationState('Action.063', { looping: false })
v_12.addComponent(new Animator()).addClip(v12)
v_12.setParent(undergronundDummy)

//add v_13
let v_13 = new Entity()
v_13.addComponent(new GLTFShape('models/game/v_13.glb'))
v_13.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 270, 0),
  })
)
engine.addEntity(v_13)
let v13 = new AnimationState('Action.064', { looping: false })
v_13.addComponent(new Animator()).addClip(v13)
v_13.setParent(undergronundDummy)
