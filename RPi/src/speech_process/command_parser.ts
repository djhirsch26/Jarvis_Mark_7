import {Command} from './types';


class CommandParser {
  public parse(message: string): Command {
    return ['SAD'];
  }
}

class ProtocolParser {
  public parse(protocol: string): Command {
    return ['HAPPY'];
  }
}

const COMMAND_PARSER = new CommandParser();
const PROTOCOL_PARSER = new ProtocolParser();

export class Parser {
  static parse(message: string): Command {
    const split = message.split(' ')
    const first_word = split[0]
    const last_word = split[split.length-1]

    if (first_word == 'protocol') {
      split.shift()
      return PROTOCOL_PARSER.parse(split.join(' '))
    } else if (last_word == 'protocol') {
      split.pop();
      return PROTOCOL_PARSER.parse(split.join(' '))
    } else {
      return COMMAND_PARSER.parse(message)
    }
  }
}
