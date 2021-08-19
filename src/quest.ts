import { RemoteQuestTracker } from '@dcl/ecs-quests'

import { Cauldron, keyIcon, playerHoldingKey } from './cauldron'
import { GemsMission } from './NPC/dialog'
import { PointerArrow } from './pointerArrow'
import * as utils from '@dcl/ecs-scene-utils'
import { NPC } from '@dcl/npc-scene-utils'
import { query } from '@dcl/quests-query'
import { ProgressStatus, QuestState } from 'dcl-quests-client/quests-client-amd'
import { Potion } from './potion'

export enum taskIds {
  intro = 'e173239d-13dd-48bb-9332-b30472e7941a',
  forestHerb = 'fca9b784-bfd7-453c-b51e-34dbb36415e7',
  medievalHerb = 'bee981f6-53b9-4f60-b7c7-3578a325f4fb',
  asianHerb = '8c2c4f32-590c-43ca-ba9c-03768065461a',
  bringHerbs = 'e24cee0f-def6-4952-afbd-b14ed8b2facf',
  catHair = '812b968f-806d-4194-86ef-35edbd6d7712',
  bringHair = '5bd92fc0-2c7b-47b1-95ef-66dd34b3b52d',
  talkChaman = '285c92a6-84b8-4a68-a083-c8737c89d17a',
  gems = '58e29d3b-bf6e-416b-bb77-35756120ab9c',
  placeGems = 'ae33a6b2-f4d2-48f6-bed6-406a8873b556',
  caliz = 'd142506e-84da-4955-8e56-a3e0fa5ae4b5',
  outro = 'cb67b6df-990c-4bcf-82b9-175126f7a302',
}

export let chaman = new NPC(
  {
    position: new Vector3(62, -40, 71),
    rotation: Quaternion.Euler(0, 200, 0),
  },
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
    continueOnWalkAway: true,
  }
)
export let cauldron: Cauldron
export let arrow: PointerArrow

export let client: RemoteQuestTracker

export async function handleQuests() {
  client = await new RemoteQuestTracker('18d80de8-9367-4cf1-9eda-de3513dc316d')
  let q = await client.getCurrentStatePromise()

  log('QUEST ', q)
  if (q.progressStatus != ProgressStatus.COMPLETED) {
    if (query(q).isTaskCompleted(taskIds.bringHerbs)) {
      //&& q.progressStatus != ProgressStatus.COMPLETED) {
      if (!query(q).isTaskCompleted(taskIds.caliz)) {
        chaman.getComponent(Transform).position.y = 4
        cauldron = new Cauldron({
          position: new Vector3(59, 4, 71),
          rotation: Quaternion.Euler(0, 180, 0),
        })
        arrow = new PointerArrow(
          {
            position: new Vector3(0, 2.5, 0),
            scale: new Vector3(1.5, 1.5, 1.5),
          },
          chaman
        )

        if (
          query(q).isTaskCompleted(taskIds.gems) &&
          !query(q).isTaskCompleted(taskIds.placeGems)
        ) {
          cauldron.show()
          cauldron.ready = true
          arrow.move(cauldron)
        }

        if (query(q).isTaskCompleted(taskIds.placeGems)) {
          arrow.move(
            doorTrigger,
            new Vector3(0, 45, 0),
            new Vector3(1.7, 3, 1),
            new Vector3(3, 3, 3)
          )
        }

        let calis = new Potion({
          position: new Vector3(76.5, 6.5, 78.5),
        })
      }
    }
  }
}

export let playerWentIn: boolean = false

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
  new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(5, 5, 5)), {
    onCameraEnter: () => {
      if (!playerHoldingKey || playerWentIn) return

      chaman.talk(GemsMission, 'finished')

      doorRA.play()
      doorLA.play()
      keyIcon.image.visible = false
      arrow.hide()
      playerWentIn = true
    },
  })
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
    new utils.TriggerBoxShape(new Vector3(16 * 18.8, 50, 16 * 18.8)),
    {
      onCameraEnter: () => {
        log('walking out')
        if (!chaman.introduced || playerHoldingKey || playerWentIn) {
          return
        }
        chaman.talk(GemsMission, 'stay')
      },
    }
  )
)

export function progressInQuest(step: string, multipleSteps?: boolean) {
  client.makeProgress(
    step,
    multipleSteps
      ? { type: 'numeric', operation: 'increase', amount: 1 }
      : { type: 'single', status: ProgressStatus.COMPLETED }
  )
}
