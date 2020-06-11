const BB_11 = 317238901
const BB_12 = 341496235
const BB_13 = 424743186
const BB_14 = 512335119
const BB_15 = 600383397
const BB_16 = 694265923
const BB_17 = 794640376

const BBGenerator = function(number, uri) {
  return {
    triggers: [
      `Bump ${number}`,
    ],
    hasButton: true,
    canSearch: false,
    canPredict: false,
    title: `Bump ${number}`,
    buttonText: `Bump ${number}`,
    protocol: [
      `${number} Protocol`
    ],
    action: function(Jarvis, params) {
      Jarvis.SoundCloudPlay(uri)
    }
  }
}

export const bump_11 = BBGenerator(11, BB_11)
export const bump_12 = BBGenerator(12, BB_12)
export const bump_13 = BBGenerator(13, BB_13)
export const bump_14 = BBGenerator(14, BB_14)
export const bump_15 = BBGenerator(15, BB_15)
export const bump_16 = BBGenerator(16, BB_16)
export const bump_17 = BBGenerator(17, BB_17)
