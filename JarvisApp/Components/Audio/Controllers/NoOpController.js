import BaseController from './BaseController'

class NoOp extends BaseController {
  static getPlayerInfo() {
    return {}
  }

  static enable() {}

  static prepareForDisable() {}
}

export default NoOp
