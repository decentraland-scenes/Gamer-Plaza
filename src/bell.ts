import { ProgressStatus } from '../node_modules/dcl-quests-client/index'
import { client } from './quest'

export class Bell extends Entity {
  clip = new AudioClip('sounds/bell.mp3')
  animation: AnimationState
  active: boolean = false

  toggle(entity: Entity, value: boolean) {
    if (this.active === value) return

    if (value) {
      const source = new AudioSource(this.clip)
      entity.addComponentOrReplace(source)
      source.loop = false
      source.playing = true
    } else {
      const source = entity.getComponent(AudioSource)
      if (source) {
        source.playing = false
      }
    }

    const animator = entity.getComponent(Animator)
    const activateClip = animator.getClip('trigger')
    const deactivateClip = animator.getClip('main')
    activateClip.looping = false
    activateClip.stop()
    deactivateClip.stop()
    const clip = value ? activateClip : deactivateClip
    clip.play()

    this.active = value
  }
  constructor(position: TransformConstructorArgs) {
    super()
    this.addComponent(new GLTFShape('models/game/Bell.glb'))

    this.addComponent(new Transform(position))

    const animator = new Animator()
    const deactivateClip = new AnimationState('main', { looping: true })
    const activateClip = new AnimationState('trigger', { looping: false })
    animator.addClip(deactivateClip)
    animator.addClip(activateClip)
    this.addComponent(animator)
    deactivateClip.play()

    // Reaction when clicked
    this.addComponent(
      new OnPointerDown(
        (e) => {
          const value = !this.active
          this.toggle(this, value)

          //   client.makeProgress(
          //     'b7c9023f-4b6e-4d07-9d74-a6914697fe9b',
          //     'a2085915-f276-4d08-a87d-956e19055444',
          //     { type: 'single', status: ProgressStatus.COMPLETED }
          //   )
        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Ring',
        }
      )
    )

    engine.addEntity(this)
  }
}
