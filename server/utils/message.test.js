var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    //store res in variable
    //assert from matches values pass
    //assert text matches
    //assert createdAt is number
    var from = 'david';
    var text = 'this is text sample';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});

  });
});
