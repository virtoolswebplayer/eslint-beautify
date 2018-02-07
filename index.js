/**
 * Created by 高乐天 on 18/2/2.
 */
const chalk = require('chalk');
//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

/**
 * Returns a canonical error level string based upon the error message passed in.
 * @param {Object} message Individual error message provided by eslint
 * @returns {string} Error level string
 */
function getMessageType(message) {
  if (message.fatal || message.severity === 2) {
    return '错误';
  }
  return '警告';
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function(results) {
  let output = '',
      total = 0;

  results.forEach(result => {
    const messages = result.messages;

    total += messages.length;

    messages.forEach(message => {
      const ruleUrl = `http://eslint.cn/docs/rules/${message.ruleId}`;
      output += `${result.filePath}:`;
      output += `${message.line || 0}:`;
      output += `${message.column || 0}\n`;
      output += `   ${getMessageType(message)}: | ${message.message} \n`;
      output += `   行号: | ${message.line} \n`;
      output += `   代码: | ${chalk.red(message.source.trim())} \n`;
      output += `   规则: | ${message.ruleId ? `${ruleUrl}` : ''}`;
      output += '\n\n';
    });
  });

  if (total > 0) {
    output += `\n${total} problem${total !== 1 ? 's' : ''}`;
  }

  return output;
};
