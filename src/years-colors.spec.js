const {unit: it, spec: describe} = require('kavun');
const assert = require('assert');

const cloneDiamonds = (cloneDiamondFn) => {
  for (var row = 0; row < 11; row++) for (var column = 0; column < 6; column++) {
    cloneDiamondFn(row, column);
  }
}

const buildSpy = () => {
  const spy = () => {
    spy.numberOfCalls++;
  };
  spy.numberOfCalls = 0;
  return spy;  
}

describe('Years config', () => {
  describe('clone diamond shapes', () => {
    it('for all 11 rows and 6 columns', () => {
      const cloneDiamondFn = buildSpy();
      cloneDiamonds(cloneDiamondFn);
      assert.equal(cloneDiamondFn.numberOfCalls, 11*6);
    });
  });
});