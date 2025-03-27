// Made by Namish Kumar in March 2025
// Source code for MDB CLI (Modified Debugging Bridge Command Line Interface)
console.clear();
let commands = ["shutdown", "restart", "reconnect", "screenshot", "battery", "battery-level", "stop-charge", "start-charge", "bluetooth"];
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
        console.error("An error occured while trying to connect to the device:-", stdrr);
        logError(stdrr);
     }
     console.log("\nConnected to the device! Now you can execute your shell commands.");
     startShell();
  });
});

function reconnect() {
   rl.question("\nMDB Shell:- Please enter the ADP IP address of your device to connect to:- ", (ip_string) => {
      ip_address_global = ip_string;
        exec(`adb connect ${ip_string}`, (error, stdout, stdrr) => {
         if(stdrr) {
            console.error("MDB Shell:- An error occured while trying to connect to the device:-", stdrr);
            logError(stdrr);
            startShell();
         }else{
         console.log("\nConnected to the device! Now you can execute your shell commands.");
         startShell();
         }
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
                 console.error("MDB Shell:- An error occured while trying to shutdown the device:-");
                 logError(stderr);
                 startShell();
              }else{
              console.log("MDB Shell:- Device is shutting down. Please note that you may need to reconnect to this Android device.");
              startShell();
              }
           });
        }else if(command === "restart") {
              exec(`adb -s ${ip_address_global} shell reboot`, (error, stdout, stderr) => {
                if(stderr) {
                   console.error("MDB Shell:- An error occured while trying to restart the device:-");
                   logError(stderr);
                   startShell();
                }else{
                console.log("MDB Shell:- Device is restarting. Please note that you may need to reconnect to this Android device.");
                startShell();  
                }
            });
        }else if(command === "reconnect") {
            exec(`adb disconnect ${ip_address_global}`, (error, stdout, stderr) => {
                if(stderr) {
                   console.error("MDB Shell:- An error occured while trying to disconnect from the device:-");
                   logError(stderr);
                   startShell();
                }else{
                console.log("MDB Shell:- Disconnected from the initial device.");
                reconnect();
                }
            });
        }else if(command === "screenshot") {
           exec(`adb -s ${ip_address_global} exec-out screencap -p > screenshot.png`, (error, stdout, stderr) => {
              if(stderr) {
                 console.error("MDB Shell:- An error occured while trying to take a screenshot of the device:-");
                 logError(stderr);
                 startShell();
              }else{
              console.log("MDB Shell:- Screenshot has been taken and saved to the device's storage (as screenshot.png).");
              startShell();
              }
           });
        }else if(command === "battery") {
           exec(`adb -s ${ip_address_global} shell dumpsys battery`, (error, stdout, stderr) => {
              if(stderr) {
                 console.error("MDB Shell:- An error occured while trying to get the battery status of the device:-");
                 logError(stderr);
                 startShell();
              }else{
              console.log("MDB Shell:- Battery status of the device:-", stdout);
              startShell();
              }
           });
        }else if(command === "battery-level") {
           exec(`adb -s ${ip_address_global} shell dumpsys battery | grep level`, (error, stdout, stderr) => {
              if(stderr) {
                 console.error("MDB Shell:- An error occured while trying to get the battery level of the device:-");
                 logError(stderr);
                 startShell();
              }else{
              console.log("MDB Shell:- " + stdout);
              startShell();
              }
           });
        }else if(command === "stop-charge") {
         exec(`adb -s ${ip_address_global} shell dumpsys battery set ac 0`, (error, stdout, stderr) => {
            if(stderr) {
               console.error("MDB Shell:- An error occured while trying to stop the device from charging:-");
               logError(stderr);
               startShell();
            }else{
            console.log("MDB Shell:- Device has been stopped from charging.");
            startShell();
            }
         });
        }else if(command === "start-charge"){
         exec(`adb -s ${ip_address_global} shell dumpsys battery set ac 1`, (error, stdout, stderr) => {
            if(stderr) {
               console.error("MDB Shell:- An error occured while trying to start the device from charging:-");
               logError(stderr);
               startShell();
            }else{
            console.log("MDB Shell:- Device has been started from charging.");
            startShell();
            }
         });
        }else if(command === "bluetooth") {
         exec(`adb -s ${ip_address_global} shell service call bluetooth_manager 6`, (error, stdout, stderr) => {
            if(stderr) {
               console.error("MDB Shell:- An error occured while trying to toggle the bluetooth status of the device:-");
               logError(stderr);
               startShell();
            }else{
            console.log("MDB Shell:- Bluetooth status of the device has been toggled.");
            startShell();
            }
         });
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