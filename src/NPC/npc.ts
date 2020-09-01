import * as ui from '../../node_modules/@dcl/ui-utils/index'
import utils from '../../node_modules/decentraland-ecs-utils/index'
import { TriggerSphereShape } from '../../node_modules/decentraland-ecs-utils/triggers/triggerSystem'
import { Dialog } from '../../node_modules/@dcl/ui-utils/utils/types'

export class NPC extends Entity {
  public introduced: boolean = false
  public solvedProblem: boolean = false
  public script: Dialog[]
  public dialog: ui.DialogWindow
  inCooldown: boolean
  constructor(
    position: TranformConstructorArgs,
    model: GLTFShape,
    script: Dialog[],
    onActivate: () => void,
    portrait?: string,
    reactDistance?: number
  ) {
    super()
    this.addComponent(model)
    this.addComponent(new Transform(position))
    engine.addEntity(this)

    this.script = script

    this.dialog = new ui.DialogWindow(portrait ? { path: portrait } : null)

    // Reaction when clicked
    this.addComponent(
      new OnPointerDown(
        (e) => {
          if (this.inCooldown || this.dialog.isDialogOpen) return

          onActivate()
        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Talk',
        }
      )
    )

    // trigger when player walks near
    this.addComponent(
      new utils.TriggerComponent(
        new TriggerSphereShape(
          reactDistance ? reactDistance : 6,
          Vector3.Zero()
        ),
        null,
        null,
        null,
        null,
        () => {
          if (this.inCooldown || this.dialog.isDialogOpen) return
          onActivate()
        }
      )
    )
  }
  talk(startIndex: number) {
    this.introduced = true
    this.inCooldown = true
    this.dialog.openDialogWindow(this.script, startIndex)
    this.addComponentOrReplace(
      new utils.Delay(5000, () => {
        this.inCooldown = false
      })
    )
  }
}
