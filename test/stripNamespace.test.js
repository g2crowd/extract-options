import stripNamespace from '../src/stripNamespace';

describe('stripNamespace', function() {
  describe('with keys in namespace', function() {
    it('strips the name', function() {
      let obj = { nameSome: 1, nameThing: 2 };
      expect(stripNamespace(obj, 'name')).toEqual({ some: 1, thing: 2 });
    });
  });

  describe('with uppercase keys in namespace', function() {
    it('strips the name', function() {
      let obj = { nAmEsOmE: 1, nAMeTHING: 2 };
      expect(stripNamespace(obj, 'name')).toEqual({ sOmE: 1, tHING: 2 });
    });
  });

  describe('with same repeating namespace', function() {
    it('just drops the first namespace', function() {
      let obj = { namename: 1, namenamename: 2 };
      expect(stripNamespace(obj, 'name')).toEqual({ name: 1, namename: 2 });
    });
  });

  describe('camelcasing', function() {
    it('downcases after the namespace', function() {
      let obj = { nameSomeThing: 1, nameotherThing: 2 };
      expect(stripNamespace(obj, 'name')).toEqual({ someThing: 1, otherThing: 2 });
    });
  });

  describe('with no keys in namespace', function() {
    it('returns the keys untouched', function() {
      let obj = { un: 1, related: 2 };
      expect(stripNamespace(obj, 'name')).toEqual({ un: 1, related: 2 });
    });
  });

  describe('with some keys in namespace', function() {
    it('touches namespaced keys', function() {
      let obj = { nameSome: 1, thing: 2 };
      expect(stripNamespace(obj, 'name')).toEqual({ some: 1, thing: 2 });
    });
  });
});
