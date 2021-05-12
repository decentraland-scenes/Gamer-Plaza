import { RemoteQuestTracker } from '@dcl/ecs-quests'
import { ProgressStatus } from 'dcl-quests-client/quests-client-amd'

import { Bell } from './bell'
import { Cauldron, keyIcon, playerHoldingKey } from './cauldron'
import { GemsMission } from './NPC/dialog'
import { PointerArrow } from './pointerArrow'
import { Potion } from './potion'
import * as utils from '@dcl/ecs-scene-utils'
import { NPC } from '@dcl/npc-scene-utils'
import { query } from '@dcl/quests-query'

export enum taskIds {
  intro = '82549f6d-3a2d-4053-96de-40269b188d3b',
  gems = 'c07a44ba-4aa7-47ae-a29a-82ecfb2129b7',
  placeGems = 'a0f00c60-66a2-482e-81ee-c831ff1f8e07',
  temple = '6cae123e-529b-4c6c-ae5c-0a1fafee95d9',
  outro = 'c8d6ad3e-1f14-4983-8e15-0eb4f8c83507',
  potion = 'aafc3022-5469-4616-8e4a-4ce2d273ac25',
  bell = '5656b183-a53a-4f95-a1ef-735c382178ef',
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
  client = await new RemoteQuestTracker('80817d29-677c-4b1d-96de-3fedf462be4d')
  let q = await client.getCurrentStatePromise()

  log('QUEST ', q)
  if (q.progressStatus != ProgressStatus.COMPLETED) {
    if (query(q).isTaskCompleted(taskIds.intro)) {
      //&& q.progressStatus != ProgressStatus.COMPLETED) {
      if (!query(q).isTaskCompleted(taskIds.temple)) {
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
      }
      let mainBell = new Bell({
        position: new Vector3(55, 4.2, 266),
        rotation: Quaternion.Euler(0, 45, 0),
        scale: new Vector3(3, 3, 3),
      })
      if (!query(q).isTaskCompleted(taskIds.potion)) {
        let potion = new Potion({
          position: new Vector3(30, 4.3, 32.6),
          scale: new Vector3(2, 2, 2),
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

      client.makeProgress(taskIds.temple, {
        type: 'single',
        status: ProgressStatus.COMPLETED,
      })
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
