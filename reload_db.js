var exec = require("child_process").exec;

exec('ruby reload_db.rb --start', function (err, stdout, stderr) {
    console.log(stdout);
});