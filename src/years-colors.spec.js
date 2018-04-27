const {unit: it, spec: describe} = require('kavun');
const assert = require('assert');

const noop = () => {};

const cloneDiamonds = (cloneDiamond, cloneDiamondWithColor) => {
  for (var row = 0; row < 11; row++) for (var column = 0; column < 6; column++) {
    cloneDiamond(row, column);
    cloneDiamondWithColor(3, 5, '#ff9800')
  }
}

const cloneDiamondsWithoutColorHandling = cloneDiamond => cloneDiamonds(cloneDiamond, noop);

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
      cloneDiamondsWithoutColorHandling(cloneDiamondFn);
      assert.equal(cloneDiamondFn.numberOfCalls, 11*6);
    });
    it('for diamond of 2016 call it with pos 3x5 and color #ff9800', () => {
      const cloneDiamondFn = buildSpy();
      const cloneDiamondWithColorFn = buildSpy();
      cloneDiamonds(cloneDiamondFn, cloneDiamondWithColorFn);
      assert.equal(cloneDiamondWithColorFn.calledWith, [3,5, '#ff9800']);
    });
  });
});