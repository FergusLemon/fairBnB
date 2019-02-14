'use strict';
const path = require('path');
const HOMEDIR = path.join(__dirname, '..');
const dateHelpers = require(path.join(HOMEDIR, 'test', 'helpers', 'dateHelpers'));
const chai = require('chai');
const expect = chai.expect;

describe('getting all dates within a range', () => {
  it('returns all dates between a start and end date', () => {
    let start = '2019-02-21T00:00:00.000Z',
        convertedStart = '2019-02-21',
        end = '2019-02-26T00:00:00.000Z',
        convertedEnd = '2019-02-26',
        result = dateHelpers.datesInARange(start, end);
    expect(result.length).to.equal(6);
    expect(result[0]).to.equal(convertedStart);
    expect(result.slice(-1)[0]).to.equal(convertedEnd);
  });
});
