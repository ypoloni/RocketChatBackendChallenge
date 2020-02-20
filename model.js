'use strict';

class Model {
  constructor(data){
    this.data = Object.assign({users: {}, tasks: []},data);
  }

  average_user_tasks(){
    return this.task_by_users()
  }

  average_country_tasks(){
    return this.task_by_country()
  }

  task_by_users(){
    var _task_by_users = this.reduce_time_spent_count('user_id');
    Object.keys(this.data.users).forEach((item, i) => {
        if (_task_by_users[item] === undefined){
          _task_by_users[item] = { time_spent: 0, count: 1 }
        }
    });
    return this.sort(this.reduce_avg(_task_by_users))
  }

  task_by_country(){
    var _task_by_country = this.reduce_time_spent_count('country');
    return this.sort(this.reduce_avg(_task_by_country))
  }

  reduce_time_spent_count(aggreation){
    var obj = {};
    this.data.tasks.forEach((item, i) => {
      var _i = item[aggreation];
      if (obj[_i] === undefined){
        obj[_i] = {time_spent: item.time_spent, count: 1}
      } else {
        obj[_i].time_spent += item.time_spent;
        obj[_i].count++;
      }
    });
    return obj;
  }

  reduce_avg(data){
    Object.keys(data).forEach((item, i) => {
      data[item] = (data[item].time_spent/data[item].count).toFixed(2)
    });
    return data;
  }

  sort(unordered){
    var ordered = {}
    Object.keys(unordered).sort().forEach(function(key) {
      ordered[key] = unordered[key];
    });
    return ordered;
  }

}

module.exports = Model;
