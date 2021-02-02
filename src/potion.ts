import * as ui from '../node_modules/@dcl/ui-utils/index'
import { progressInQuest } from './quest'

export class Potion extends Entity {
  clip = new AudioClip('sounds/drink.mp3')

  drink() {
    const source = new AudioSource(this.clip)
    this.addComponentOrReplace(source)
    source.loop = false
    source.playing = true

    this.getComponent(GLTFShape).visible = false

    ui.displayAnnouncement("That'll give me a hangover tomorrow. Bad idea.")
    // quest check
  }
  constructor(position: TransformConstructorArgs) {
    super()
    this.addComponent(new GLTFShape('models/game/Potion_03.glb'))

    this.addComponent(new Transform(position))

    // Reaction when clicked
    this.addComponent(
      new OnPointerDown(
        (e) => {
          this.drink()

          progressInQuest('eae19e16-cda8-4aca-8366-91d09ac707b3')
        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Drink',
        }
      )
    )

    engine.addEntity(this)
  }
}
