var assert = require('assert');
var Model = require('../model')

describe('Model', function() {

  describe('#average_user_tasks()', function() {
    it('should return empty Object when the data object is empty', function() {
      var model = new Model({})
      assert.equal(Object.keys(model.average_user_tasks()).length, 0);
    });

    it('should return ordened Object with user id as key and average as value', function() {
      var model = new Model({users: {'1': 'PT'}, tasks: [{id: '1', user_id: '1', time_spent: 10, country:  'PT'},{id: '1', user_id: '1', time_spent: 2, country:  'PT'}]})
      var result = model.average_user_tasks();
      assert.equal(result['1'], "6.0");
    });

    it('should return ordened Object with user id as key and average as value', function() {
      var model = new Model({users: {'1': 'PT'}, tasks: [{id: '1', user_id: '1', time_spent: 10, country:  'PT'},
        {id: '1', user_id: '1', time_spent: 2, country:  'PT'},
        {id: '1', user_id: '1', time_spent: 4, country:  'US'},
        {id: '1', user_id: '1', time_spent: 7, country:  'PT'}
      ]})
      var result = model.average_user_tasks();
      assert.equal(result['1'], "5.8");
    });
  });

  describe('#average_country_tasks()', function() {
    it('should return empty Object when the data object is empty', function() {
      var model = new Model({})
      assert.equal(Object.keys(model.average_country_tasks()).length, 0);
    });

    it('should return ordened Object with user id as key and average as value', function() {
      var model = new Model({users: {'1': 'PT'}, tasks: [{id: '1', user_id: '1', time_spent: 10, country:  'PT'},{id: '1', user_id: '1', time_spent: 2, country:  'PT'}]})
      var result = model.average_country_tasks();
      assert.equal(result['PT'], "6.0");
    });

    it('should return ordened Object with user id as key and average as value', function() {
      var model = new Model({users: {'1': 'PT'}, tasks: [{id: '1', user_id: '1', time_spent: 10, country:  'PT'},
        {id: '1', user_id: '1', time_spent: 2, country:  'PT'},
        {id: '1', user_id: '1', time_spent: 4, country:  'US'},
        {id: '1', user_id: '1', time_spent: 7, country:  'PT'}
      ]})
      var result = model.average_country_tasks();
      assert.equal(result['PT'], "6.3");
      assert.equal(result['US'], "4.0");
    });
  });

});
