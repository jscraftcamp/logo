const {unit: it, spec: describe} = require('kavun');
const xit = () => {};
const assert = require('assert');
const {cloneDiamonds} = require('./static-logo');

const noop = () => {};

const cloneDiamondsWithoutColorHandling = cloneDiamond => cloneDiamonds({}, cloneDiamond, noop);

const buildSpy = () => {
  const spy = (...args) => {
    spy.numberOfCalls++;
    spy.calledWith.push(args);
  };
  spy.numberOfCalls = 0;
  spy.calledWith = [];
  spy.wasCalledWith = expectedArgs => 
    spy.calledWith.some(args => JSON.stringify(expectedArgs) === JSON.stringify(args));
  return spy;  
}

describe('Years config', () => {
  describe('clone diamond shapes', () => {
    it('for all 11 rows and 6 columns', () => {
      const cloneDiamondFn = buildSpy();
      cloneDiamondsWithoutColorHandling(cloneDiamondFn);
      assert.equal(cloneDiamondFn.numberOfCalls, 11*6);
    });
    describe('WHEN one year is configured differently', () => {
      const cloneWithOneColoredDiamond = (cloneDiamondWithColorSpy, cloneDiamondSpy = noop) => {
        const config = { 2016: { position: { x: 3, y: 5 }, color: '#ff9800' } };
        cloneDiamonds(config, cloneDiamondSpy, cloneDiamondWithColorSpy);
      }
      it('clone diamond with given color', () => {
        const spy = buildSpy();
        cloneWithOneColoredDiamond(spy);
        assert(spy.wasCalledWith([3, 5, '#ff9800']));
      });
      it('clone only 11*6-1 "default" diamonds', () => {
        const defaultDiamondSpy = buildSpy();
        cloneWithOneColoredDiamond(noop, defaultDiamondSpy);
        assert.equal(defaultDiamondSpy.numberOfCalls, 11*6-1);
      });
      it('clone ONLY one colored diamond', () => {
        const spy = buildSpy();
        cloneWithOneColoredDiamond(spy);
        assert.equal(spy.numberOfCalls, 1);
      });
    });
    describe('WHEN multiple years are configured', () => {
      const cloneWithOneColoredDiamond = (cloneDiamondWithColorSpy, cloneDiamondSpy = noop) => {
        const config = { 
          2016: { position: { x: 3, y: 5 }, color: '#ff9800' }, 
          2017: { position: { x: 4, y: 5 }, color: 'green' }, 
          2018: { position: { x: 5, y: 5 }, color: 'blue' }, 
        };
        cloneDiamonds(config, cloneDiamondSpy, cloneDiamondWithColorSpy);
      }
      it('clone diamond with second year`s config', () => {
        const cloneDiamondWithColorFn = buildSpy();
        cloneWithOneColoredDiamond(cloneDiamondWithColorFn);
        assert(cloneDiamondWithColorFn.wasCalledWith([4, 5, 'green']));
      });
      it('clone diamond with third year`s config', () => {
        const cloneDiamondWithColorFn = buildSpy();
        cloneWithOneColoredDiamond(cloneDiamondWithColorFn);
        assert(cloneDiamondWithColorFn.wasCalledWith([5, 5, 'blue']));
      });
    });
  });
});
