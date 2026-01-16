const hey = require("./hey.js");
const login = require("./login.js");
const balance = require("./balance.js");
const editpoint = require("./editpoint.js");
const editservice = require("./editservice.js");
const showservice = require("./showservice.js");
const use = require("./use.js");
const tasks = require("./tasks.js");
const deleteTask = require("./deleteTasks.js");

const commands = [
  hey,
  login,
  balance,
  editpoint,
  editservice,
  showservice,
  use,
  tasks,
  deleteTask,
];

const commandsByName = new Map(
  commands.map((command) => [command.data.name, command]),
);

const commandData = commands.map((command) => command.data.toJSON());

module.exports = {
  commands,
  commandsByName,
  commandData,
};
