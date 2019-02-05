import subject from '../src/extractOptions';

describe('extractOptions', function () {
  describe('no namespace', function () {
    it('should return object unmodified', function () {
      let obj = {someThing: 1, thing: 2};
      expect(subject(obj)).toEqual({someThing: 1, thing: 2});
    });
  });

  describe('with keys in namespace', function () {
    it('should strip the namespace', function () {
      let obj = {nameSomeThing: 1, nameThing: 2};
      expect(subject(obj, 'name')).toEqual({someThing: 1, thing: 2});
    });
  });

  describe('with blank values', function () {
    it('converts blank values to undefined', function () {
      let obj = {nameSomeThing: '1', nameThing: ''};
      expect(subject(obj, 'name')).toEqual({someThing: '1', thing: undefined});
    });
  });

  describe('with no keys in namespace', function () {
    it('return an empty object', function () {
      let obj = {nameSome: 1, nameThing: 2};
      expect(subject(obj, 'nada')).toEqual({});
    });
  });

  describe('with some keys in namespace', function () {
    it('return the namespaced keys', function () {
      let obj = {some: 1, nameThing: 2};
      expect(subject(obj, 'name')).toEqual({thing: 2});
    });
  });

  describe('with options hash', function () {
    it('should return the options hash', function () {
      let obj = {nameOptions: {some: 1}};
      expect(subject(obj, 'name')).toEqual({some: 1});
    });
  });

  describe('with option hash and namespaced keys', function () {
    it('the options hash be combined with other keys', function () {
      let obj = {nameOptions: {some: 1}, nameOther: 3};
      expect(subject(obj, 'name')).toEqual({some: 1, other: 3});
    });

    it('the options hash should win', function () {
      let obj = {nameOptions: {some: 1}, nameSome: 3};
      expect(subject(obj, 'name')).toEqual({some: 1});
    });
  });

  describe('with same key and namespace', function () {
    it('drops the record', function () {
      let obj = {name: 1};
      expect(subject(obj, 'name')).toEqual({});
    });
  });

  describe('with underscored attr name', function () {
    it('finds the name properly', function () {
      let obj = {name_my_attr: 1};
      expect(subject(obj, 'name')).toEqual({my_attr: 1});
    });
  });
});
