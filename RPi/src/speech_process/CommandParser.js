// The command matching code is a modified version of Annyang, under the MIT license.
var commandsList = [];

var optionalParam = /\s*\((.*?)\)\s*/g;
var optionalRegex = /(\(\?:[^)]+\))\?/g;
var namedParam    = /(\(\?)?:\w+/g;
var splatParam    = /\*\w+/g;
var escapeRegExp  = /[-{}[\]+?.,\\^$|#]/g;
var commandToRegExp = function(command) {
 command = command
   .replace(escapeRegExp, '\\$&')
   .replace(optionalParam, '(?:$1)?')
   .replace(namedParam, function(match, optional) {
     return optional ? match : '([^\\s]+)';
   })
   .replace(splatParam, '(.*?)')
   .replace(optionalRegex, '\\s*$1?\\s*');
 return new RegExp('^' + command + '$', 'i');
};


var registerCommand = function(command, callback, originalPhrase) {
  commandsList.push({ command, callback, originalPhrase });
};

var addCommands = function(commands) {
  for (let phrase in commands) {
    var cb = commands[phrase]
    registerCommand(commandToRegExp(phrase), cb, phrase);
  }
}

var init = function() {
  commandsList = [];
}


// try and match recognized text to one of the commands on the list
var parseResults = function(commandText) {
    // try and match recognized text to one of the commands on the list
    for (let j = 0; j < commandsList.length; j++) {
      var currentCommand = commandsList[j];
      var result = currentCommand.command.exec(commandText);
      if (result) {
        var parameters = result.slice(1);
        // execute the matched command
        currentCommand.callback.apply(this, parameters);
        return;
      }
    }
  };

  module.exports = {
    init: init,
    parseText: parseResults,
    addCommands: addCommands,
  }
