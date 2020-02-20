// INPUT STREAM
// FIRST LINE NUMBER OF USERS
// Next N (NUMBER OF USERS) Lines Are User adm Country of User
// NEXT LINE NUMBER OF TASKS
// Next N (NUMBER OF TASKS) Lines are ID TASK, ID USER, Time Spent in seconds
// EXAMPLE:
// 2 //NUMBER OF USERS
// 1 PT // FIRST USER
// 2 US // SECOND USER
// 3 // NUMBER OF TASKS
// 1 1 10 // FIRST TASK
// 2 1 5 // SECOND TASk
// 3 2 10 // Third TASK

const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const Model = require('./model');

let filename = process.argv[2];

process.stdin.setEncoding('UTF-8');

let input = undefined;

if (filename === undefined){
  input = process.stdin;
  if(process.stdin.isTTY && filename === undefined){
    console.log('Please after insert data press CRTL+D')
  }
} else {
  input = createReadStream(filename)
}

const rl = createInterface({
  input: input,
  output: '/dev/null',
  terminal: false
});

let cursor = 0;

let data = {
  users: {},
  tasks: []
};

var _line = undefined;

const parse_line = (line) => {
  if (cursor === 0) {
    data.number_of_users = parseInt(line.trim())
  } else if (cursor <= data.number_of_users) {
    var _line = line.trim().split(" ");
    data.users[_line[0]] = _line[1];
  } else if (cursor == (data.number_of_users+1)) {
    data.number_of_taks = parseInt(line.trim());
    data._cursor_of_taks = cursor+data.number_of_taks;
  } else if (cursor <= data._cursor_of_taks ){
    var _line = line.trim().split(" ");
    var _country = data.users[_line[1]] === undefined ? 'Other' : data.users[_line[1]];
    data.tasks.push({id: _line[0], user_id: _line[1], time_spent: parseInt(_line[2]), country:  _country});
  }
  cursor++;
}

rl.on('line', parse_line);

const print = function(data){
  Object.keys(data).forEach((item, i) => {
    console.log(item,data[item])
  });
}

const onClose = () => {
  let model = new Model(data);

  print(model.average_user_tasks());

  print(model.average_country_tasks());

  process.exit();
}

once(rl, 'close').then(onClose)
