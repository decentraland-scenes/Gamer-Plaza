import { Dialog } from '@dcl/npc-scene-utils'
import { progressInQuest, taskIds } from '../quest'
import { startGemUI } from '../gem'

export let GemsMission: Dialog[] = [
  {
    text: `Hello stranger ... brrr`,
  },
  {
    text: `I hear you're searching for a chalice, one that is fit for holding the <color=red>Drink of the Gods</color>. I think I can help.`,
  },
  {
    text: `A myth says that there are hidden gems, kept inside the <color=red>ancient vases</color> you see around the plaza.`,
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
    text: `I need about <color=red>10</color> of these gems. With that I can then melt them and forge a <color=red>key</color>, that we can use to open the Hades's Mausoleum brrr....`,
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
    text: `But hurry up...brrr i'm very impatient brrr... If you don't come back within <color=red>6 minutes and 66 seconds</color> I will turn off the fire...brrr`,
  },
  {
    text: `And I know... that's 7 minutes and 6 seconds, but it's kind of my thing.`,
    isEndOfDialog: true,
    triggeredByNext: () => {
      progressInQuest(taskIds.talkChaman)

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
    text: `Ha! That's a fine key, isn't it? brrrr... take it and open the door behind me!`,
    isEndOfDialog: true,
  },
  {
    name: 'usekey',
    text: `hmmm br... what are you waiting for? use the key to open the door behind me!`,
    isEndOfDialog: true,
  },
  {
    name: 'finished',
    text: `hehe i knew you could do it, stranger... brr.... Take the Chalice, it's yours now.`,
    isEndOfDialog: true,
  },
  {
    name: 'nogem',
    text: `No gem in this one... but keep looking brrrr`,
    isEndOfDialog: true,
  },
]
