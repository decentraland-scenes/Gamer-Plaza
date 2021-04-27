import * as ui from '@dcl/ui-scene-utils'
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

          progressInQuest('aafc3022-5469-4616-8e4a-4ce2d273ac25')
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
