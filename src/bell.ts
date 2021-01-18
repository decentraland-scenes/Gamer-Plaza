export class Bell extends Entity {
  clip = new AudioClip('sounds/bell.mp3')
  animation: AnimationState
  active: boolean = false

  toggle(entity: Entity, value: boolean) {
    if (this.active === value) return

    if (value) {
      const source = new AudioSource(this.clip)
      entity.addComponentOrReplace(source)
      source.loop = true
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
    activateClip.stop()
    deactivateClip.stop()
    const clip = value ? activateClip : deactivateClip
    clip.play()

    this.active = value
  }
  constructor(position: TranformConstructorArgs) {
    super()
    this.addComponent(new GLTFShape('models/game/Bell.glb'))

    this.addComponent(new Transform(position))

    const animator = new Animator()
    const deactivateClip = new AnimationState('main', { looping: true })
    const activateClip = new AnimationState('trigger', { looping: true })
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
