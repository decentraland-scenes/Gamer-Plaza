import { Dialog } from '../../node_modules/@dcl/ui-utils/utils/types'
import { startGemUI } from '../gem'

export let GemsMission: Dialog[] = [
  {
    text: `Hello stranger ... brrr`,
  },
  {
    text: `A myth says that there are hidden gems, kept inside the vases you see around the plaza.`,
  },
  {
    text: `Not all vases have them. I've been trying a few with no luck brrrr  ... I can't anymore, so tired`,
  },

  {
    text: `I need about 10 of these gems. With that I can then melt them and forge a key, that we can use to open the Hades's Mausoleum brrr....`,
  },
  {
    text: `Can you help me finding them? brrr...`,
    offsetY: 20,
    isQuestion: true,
    labelE: { label: `Yes!`, offsetX: 12 },
    labelF: { label: `I'm busy`, offsetX: 12 },
    ifPressE: 5,
    ifPressF: 7,
    triggeredByE: () => {
      startGemUI()
    },
  },
  {
    text: `Ok...awesome! brr.... in the meantime i will prepare the cauldron to melt the gems brr...`,
  },
  {
    text: `But hurry up...brrr i'm very impatient brrr... If you don't come back within 5 minutes i will turn off the fire...brrr`,
    isEndOfDialog: true,
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
    text: `hmm... brrr.... too slow...  I'm turning off the fire now`,
    isEndOfDialog: true,
  },
  {
    text: `Awesome, you found enough! brr... hurry up and put the gems into the cauldron and let's see what happens!`,
    isEndOfDialog: true,
  },
  {
    text: `hmmm br... what are you waiting for? Throw the gems into the cauldron!`,
    isEndOfDialog: true,
  },
  {
    text: `ha! looks great, right? brrrr... take the key and open the door!`,
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
]
