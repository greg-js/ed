var table = require('text-table');

module.exports = function() {
  console.log('Usage: clg [command]\n\nCommands:')
  console.log(table([
    ['', ''],
    ['new', 'Drop a new file with preconfigured metadata into a preconfigured folder'],
    ['', ''],
    ['edit', 'Edit a markdown file, using regex and other filters (alias: e)'],
    ['  options', '  [search terms] [--ext --extension] [-g --gui] [-d --dir] [-f --filter]'],
    ['  ', '  [-s --source] [-k --apropos] [-t --tag --tags] [-c --cat --category]'],
    ['', ''],
    ['rename', 'Find and rename a file\'s title and/or path'],
    ['  options', '  <--nn --nm --new-name> [--na --new-asset]'],
    ['', ''],
    ['delete', 'Find and delete a file'],
    ['', ''],
    ['help', 'Prints this help message (alias: h)'],
    ['version', 'Prints the current version (alias: v)']
  ]));
  console.log('\nFor more information about the command-line and configuration options, read the full readme on GitHub:\nhttps://github.com/greg-js/clg\n');
};
