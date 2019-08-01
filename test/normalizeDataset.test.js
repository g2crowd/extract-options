// @format
import { normalizeDataset as subject } from '../src/normalizeDataset';

describe('extractData', function() {
  describe('when dataset is available', function() {
    it('returns the value from dataset', function() {
      let dataset = { x: 1 };
      expect(subject(dataset)).toEqual({ x: 1 });
    });

    it('returns the value from dataset', function() {
      let dataset = { x: 1, y: 2 };
      expect(subject(dataset)).toEqual({ x: 1, y: 2 });
    });

    it('is immutable result', function() {
      let dataset = { x: 1, y: 2 };
      let res = subject(dataset);
      res.y = 7;

      expect(dataset.y).toEqual(2);
    });

    describe('when string starts with {', function() {
      it('parses valid JSON to objects', function() {
        let dataset = { x: '{ "z": true }' };
        expect(subject(dataset)).toEqual({ x: { z: true } });
      });

      it('leaves invalid JSON as a string', function() {
        let dataset = { x: '{ "z": true' };
        expect(subject(dataset)).toEqual({ x: '{ "z": true' });
      });
    });

    describe('when string starts with [', function() {
      it('parses valid JSON to objects', function() {
        let dataset = { x: '[1, 2]' };
        expect(subject(dataset)).toEqual({ x: [1, 2] });
      });

      it('leaves invalid JSON as a string', function() {
        let dataset = { x: '[1, 2' };
        expect(subject(dataset)).toEqual({ x: '[1, 2' });
      });
    });
  });
});
