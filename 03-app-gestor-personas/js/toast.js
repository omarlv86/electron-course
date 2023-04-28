const { Notification } = require('electron')

exports.alert = function(title, body){
    console.log(title, body)
    new window.Notification(title, { body });
}