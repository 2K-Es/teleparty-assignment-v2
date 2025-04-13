import _property from 'lodash/property';

/**
 * @typedef {Object} messageObjectReader
 * @property {boolean} isSystemMessage
 * @property {string} userIcon
 * @property {string} userNickname
 * @property {string} body
 * @property {string} permId
 * @property {number} timestamp
 */
const messageObjectReader = {
  isSystemMessage: _property('isSystemMessage'),
  userIcon: _property('userIcon'),
  userNickname: _property('userNickname'),
  body: _property('body'),
  permId: _property('permId'),
  timestamp: _property('timestamp'),
};

export default messageObjectReader;
