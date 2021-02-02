import { signedFetch } from '@decentraland/SignedFetch'
import { NPC } from '../node_modules/@dcl/npc-utils/index'
import {
  QuestsClient,
  ProgressStatus,
} from 'dcl-quests-client/quests-client-amd'

import { TriggerBoxShape } from '../node_modules/decentraland-ecs-utils/triggers/triggerSystem'
import { Bell } from './bell'
import { Cauldron, keyIcon, playerHoldingKey } from './cauldron'
import { GemsMission } from './NPC/dialog'
import { PointerArrow } from './pointerArrow'
import { Potion } from './potion'
import utils from '../node_modules/decentraland-ecs-utils/index'

export let playerWentIn: boolean = false

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

export let client: QuestsClient

let introDone: boolean = false
let potionDone: boolean = false
let bellDone: boolean = false
let chamanDone: boolean = false

export async function handleQuests() {
  client = await new QuestsClient({
    baseUrl: 'https://quests-api.decentraland.io',
    fetchFn: signedFetch,
  })
  let q = await client.getQuestDetails('b7c9023f-4b6e-4d07-9d74-a6914697fe9c')
  log('QUEST ', q)
  if (q.ok && q.body.progressStatus != ProgressStatus.COMPLETED) {
    for (let task of q.body.tasks) {
      if (
        task.id == '7bd3d240-13fa-4559-b4fe-f870a9afd5d6' &&
        task.progressStatus == ProgressStatus.COMPLETED
      ) {
        log('already spoke')
        introDone = true
      } else if (
        task.id == 'bf851b43-f174-4b31-af73-b7b098c00263' &&
        task.progressStatus == ProgressStatus.COMPLETED
      ) {
        log('already did chaman')
        chamanDone = true
      } else if (
        task.id == 'eae19e16-cda8-4aca-8366-91d09ac707b3' &&
        task.progressStatus == ProgressStatus.COMPLETED
      ) {
        potionDone = true
      } else if (
        task.id == 'a2085915-f276-4d08-a87d-956e19055444' &&
        task.progressStatus == ProgressStatus.COMPLETED
      ) {
        bellDone = true
      }
    }
    if (q.ok && introDone) {
      //&& q.body.progressStatus != ProgressStatus.COMPLETED) {
      if (!chamanDone) {
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
      }
      let mainBell = new Bell({
        position: new Vector3(55, 4.2, 266),
        rotation: Quaternion.Euler(0, 45, 0),
        scale: new Vector3(3, 3, 3),
      })
      if (!potionDone) {
        let potion = new Potion({
          position: new Vector3(30, 4.3, 32.6),
          scale: new Vector3(2, 2, 2),
        })
      }
    }
  }
}

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
  new utils.TriggerComponent(
    new TriggerBoxShape(new Vector3(5, 5, 5), Vector3.Zero()),
    null,
    null,
    null,
    null,
    () => {
      if (!playerHoldingKey || playerWentIn) return
      chaman.talk(GemsMission, 'finished')

      doorRA.play()
      doorLA.play()
      keyIcon.image.visible = false
      arrow.hide()
      playerWentIn = true

      client.makeProgress(
        'b7c9023f-4b6e-4d07-9d74-a6914697fe9c',
        'b3f05f45-5344-4616-909e-afacbec74910',
        { type: 'single', status: ProgressStatus.COMPLETED }
      )
    }
  )
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
    new TriggerBoxShape(new Vector3(16 * 18.8, 50, 16 * 18.8), Vector3.Zero()),
    null,
    null,
    null,
    null,
    null,
    () => {
      log('walking out')
      if (!chaman.introduced || playerHoldingKey || playerWentIn) {
        return
      }
      chaman.talk(GemsMission, 'stay')
    }
  )
)

export function progressInQuest(step: string, multipleSteps?: boolean) {
  client.makeProgress(
    'b7c9023f-4b6e-4d07-9d74-a6914697fe9c',
    step,
    multipleSteps
      ? { type: 'count', amount: 1 }
      : { type: 'single', status: ProgressStatus.COMPLETED }
  )
}
