var inquirer = require('inquirer');
var chalk = require('chalk');

var formatDate = require('./format-date');

module.exports = function(items, message, rootDir, config, cb) {
  var ln = items.length;

  var entries = items.sort(function(a, b) {
    var aDate = a.attributes.date;
    var bDate = b.attributes.date;

    // posts without date metadata go last
    if (!bDate && !!aDate) {
      return -1;
    } else if (!aDate && !!bDate) {
      return 1;
    // sort on filename if no dates are available at all
    } else if (!aDate && !bDate) {
      return (b.fileName.toLowerCase() >= a.fileName.toLowerCase()) ? -1 : 1;
    }
    // date sort otherwise
    return new Date(bDate) - new Date(aDate);
  }).map(function(item, index) {
    var title = item.attributes.title || item.attributes.name;

    // format the date if it is the showProp
    var showProp = (config.showProp === 'date') ? chalk.gray(formatDate(item.attributes.date)) : chalk.gray(item.attributes[config.showProp]);

    // don't display anything as showProp if it is null
    var formattedProp = (config.showProp) ? ' (' + showProp  + ')' : '';

    var counter = [ chalk.yellow('['), chalk.cyan(index + 1), '/', chalk.cyan(ln), chalk.yellow(']'), ' ' ].join('');

    return title ? counter + title + formattedProp : counter + item.path;
  });

  inquirer.prompt([{
    type: 'list',
    name: 'file',
    message: message,
    choices: entries
  }]).then(function(answer) {
    var pos = entries.indexOf(answer.file);
    var selected = entries[pos];

    if (selected) {
      cb(null, items[pos]);
    } else {
      cb('invalid choice', null);
    }
  }).catch(function(err) {
    console.error(err);
  });
};
