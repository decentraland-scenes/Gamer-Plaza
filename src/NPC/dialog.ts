import { Dialog } from '../../node_modules/@dcl/npc-utils/utils/types'
import { ProgressStatus } from '../../node_modules/dcl-quests-client/index'
import { client } from '../quest'
import { startGemUI } from '../gem'

export let GemsMission: Dialog[] = [
  {
    text: `Hello stranger ... brrr`,
  },
  {
    text: `A myth says that there are hidden gems, kept inside the ancient vases you see around the plaza.`,
    image: {
      path: 'images/vessel.png',
      height: 128,
      width: 128,
      offsetX: -20,
      section: { sourceHeight: 256, sourceWidth: 256 },
    },
  },
  {
    text: `Not all vases have gems in them. I've been trying a few with no luck brrrr  ... I can't anymore, so tired`,
    image: {
      path: 'images/vessel.png',
      height: 128,
      width: 128,
      offsetX: -20,
      section: { sourceHeight: 256, sourceWidth: 256 },
    },
  },

  {
    text: `I need about 10 of these gems. With that I can then melt them and forge a key, that we can use to open the Hades's Mausoleum brrr....`,
    image: {
      path: 'images/Key.png',
      height: 128,
      width: 128,
      offsetX: -20,
      section: { sourceHeight: 256, sourceWidth: 256 },
    },
  },
  {
    text: `Can you help me finding them? brrr...`,
    offsetY: 20,
    isQuestion: true,
    buttons: [
      { label: `Yes!`, goToDialog: 'yes', offsetX: 12 },
      { label: `I'm busy`, goToDialog: 'no', offsetX: 12 },
    ],
  },
  {
    name: 'yes',
    text: `Ok...awesome! brr.... in the meantime i will prepare the cauldron to melt the gems brr...`,
  },
  {
    text: `But hurry up...brrr i'm very impatient brrr... If you don't come back within 6 minutes and 66 seconds I will turn off the fire...brrr`,
  },
  {
    text: `And I know... that's 7 minutes and 6 seconds, but it's kind of my thing.`,
    isEndOfDialog: true,
    triggeredByNext: () => {
      client.makeProgress(
        'b7c9023f-4b6e-4d07-9d74-a6914697fe9b',
        'bf851b43-f174-4b31-af73-b7b098c00263',
        { type: 'single', status: ProgressStatus.COMPLETED }
      )
      startGemUI()
    },
  },

  {
    name: 'no',
    text: `Ok. come back anytime stranger brr....`,
    isEndOfDialog: true,
  },
  {
    name: 'gemstillout1',
    text: `hmm... brrr.... The gems are out there, go find them! I need at least 10... br....`,
    isEndOfDialog: true,
  },
  {
    name: 'gemstillout2',
    text: `What are you doing still here? Go find the gems!`,
    isEndOfDialog: true,
  },
  {
    //11
    name: 'tooslow',
    text: `hmm... brrr.... too slow...  I'm turning off the fire now`,
    isEndOfDialog: true,
  },
  {
    name: 'success',
    text: `Awesome, you found enough gems! brr`,
  },
  {
    text: `Hurry up and put the gems into the cauldron. Let's see if I can craft that key with them!`,
    isEndOfDialog: true,
  },
  {
    name: 'stay',
    text: `Where are you going?? The gems are all inside the Gamer Plaza, don't leave!`,
    isEndOfDialog: true,
  },

  {
    name: 'cauldronreminder',
    text: `hmmm br... what are you waiting for? Throw the gems into the cauldron!`,
    isEndOfDialog: true,
  },
  {
    //16
    name: 'getkey',
    text: `Ha! That's a fine key, isn't it? brrrr... take it and open the door!`,
    isEndOfDialog: true,
  },
  {
    name: 'usekey',
    text: `hmmm br... what are you waiting for? use the key to open the door!`,
    isEndOfDialog: true,
  },
  {
    name: 'finished',
    text: `hehe i knew you could do it, stranger... brr.... i'm going to look for more secrets in this plaza....`,
    isEndOfDialog: true,
  },
  {
    name: 'nogem',
    text: `No gem in this one... but keep looking brrrr`,
    isEndOfDialog: true,
  },
]
