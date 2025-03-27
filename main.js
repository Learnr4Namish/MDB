// Made by Namish Kumar in March 2025
// Source code for MDB CLI (Modified Debugging Bridge Command Line Interface)
console.clear();
let commands = ["shutdown", "restart", "reconnect"];
const readline = require('readline');
const { format } = require('date-fns');
const exec = require("child_process").exec;
const fs = require("fs");
let ip_address_global;
const rl = readline.createInterface(process.stdin, process.stdout);
rl.question("Welcome to Wireless MDB (Modified Debuging Bridge) CLI! Please enter the ADP IP address of your device to connect to:- ", (ip_string) => {
  ip_address_global = ip_string;
    exec(`adb connect ${ip_string}`, (error, stdout, stdrr) => {
     if(stdrr) {
        console.error("An error occured while trying to connect to the device:-", err);
        logError(stdrr);
     }
     console.log("\nConnected to the device! Now you can execute your shell commands.");
     startShell();
  });
});

function reconnect() {
   rl.question("Alright! Please enter the ADP IP address of your device to connect to:- ", (ip_string) => {
      ip_address_global = ip_string;
        exec(`adb connect ${ip_string}`, (error, stdout, stdrr) => {
         if(stdrr) {
            console.error("An error occured while trying to connect to the device:-", err);
            logError(stdrr);
         }
         console.log("\nConnected to the device! Now you can execute your shell commands.");
         startShell();
      });
    });
}

function startShell() {
  rl.question(`$MDB> `, (command) => {
     if(command === "exit") {
        console.log("Exiting Wireless MDB CLI...");
        rl.close();
        process.exit(0);
     }else if(command.length === 0) {
        console.log("MDB Shell:- Please enter a valid command.");
        startShell();
     }else if(commands.includes(command)) {
        if(command === "shutdown") {
           exec(`adb -s ${ip_address_global} shell reboot -p`, (error, stdout, stderr) => {
              if(stderr) {
                 console.error("An error occured while trying to shutdown the device:-");
                 logError(stderr);
              }
              console.log("MDB Shell:- Device is shutting down. Please note that you may need to reconnect to this Android device.");
              startShell();
           });
        }else if(command === "restart") {
              exec(`adb -s ${ip_address_global} shell reboot`, (error, stdout, stderr) => {
                if(stderr) {
                   console.error("An error occured while trying to restart the device:-");
                   logError(stderr);
                }
                console.log("MDB Shell:- Device is restarting. Please note that you may need to reconnect to this Android device.");
                startShell();  
            });
        }else if(command === "reconnect") {
            reconnect();
        }
    }else{
        console.log("MDB Shell:- Invalid command. Please enter a valid command.");
        startShell();
    }
  });
}

function logError(error) {
    const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    fs.appendFile('Error.log', `${String(currentDate)}: ${error}`, function (err) {
        if (err) throw err;
      });      
}