import * as Skills from '.'

import {ORG_IDENTIFIER} from '../constants'

var skills={};

import JarvisInstance from '../Components/Skills/JarvisInstance'


Object.entries(Skills)
  .filter(([name, skill]) => skill.hasButton)
  .map(([name, skill]) => {
    skills[name] = skill
  })


export function triggerSkillFromIdentifier(activityType) {
  const identifier = activityType.substring(ORG_IDENTIFIER.length)
  console.log("SAD")
  console.log(skills[identifier], identifier, skills)
  const Jarvis = JarvisInstance.getInstance(global.store)
  skills[identifier].action(Jarvis, {})
}
