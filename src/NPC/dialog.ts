import { Dialog } from '../../node_modules/@dcl/ui-utils/utils/types'
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
    labelE: { label: `Yes!`, offsetX: 12 },
    labelF: { label: `I'm busy`, offsetX: 12 },
    ifPressE: 5,
    ifPressF: 7,
  },
  {
    text: `Ok...awesome! brr.... in the meantime i will prepare the cauldron to melt the gems brr...`,
  },
  {
    text: `But hurry up...brrr i'm very impatient brrr... If you don't come back within 6 minutes and 66 seconds I will turn off the fire...brrr`,
  },
  {
    text: `And I know... that's 7 minutes and 6 seconds, but it's kind of my thing.`,
    isEndOfDialog: true,
    triggeredByNext: () => {
      startGemUI()
    },
  },

  {
    text: `Ok. come back anytime stranger brr....`,
    isEndOfDialog: true,
  },
  {
    text: `hmm... brrr.... The gems are out there, go find them! I need at least 10... br....`,
    isEndOfDialog: true,
  },
  {
    text: `What are you doing still here? Go find the gems!`,
    isEndOfDialog: true,
  },
  {
    //11
    text: `hmm... brrr.... too slow...  I'm turning off the fire now`,
    isEndOfDialog: true,
  },
  {
    text: `Awesome, you found enough gems! brr`,
  },
  {
    text: `Hurry up and put the gems into the cauldron. Let's see if I can craft that key with them!`,
    isEndOfDialog: true,
  },
  {
    text: `Where are you going?? The gems are all inside the Gamer Plaza, don't leave!`,
    isEndOfDialog: true,
  },

  {
    text: `hmmm br... what are you waiting for? Throw the gems into the cauldron!`,
    isEndOfDialog: true,
  },
  {
    //16
    text: `Ha! That's a fine key, isn't it? brrrr... take it and open the door!`,
    isEndOfDialog: true,
  },
  {
    text: `hmmm br... what are you waiting for? use the key to open the door!`,
    isEndOfDialog: true,
  },
  {
    text: `hehe i knew you could do it, stranger... brr.... i'm going to look for more secrets in this plaza....`,
    isEndOfDialog: true,
  },
  {
    text: `No gem in this one... but keep looking brrrr`,
    isEndOfDialog: true,
  },
]
