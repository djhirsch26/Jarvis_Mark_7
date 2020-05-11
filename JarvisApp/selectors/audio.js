import { createSelector } from 'reselect'

const getPlayerInfo = state => state.audio.playerInfo

export const getPlayerPosition = createSelector(
  [getPlayerInfo],
  (playerInfo) => {
    console.log("SELECTED PLAYER INFO", playerInfo)
  }
)
