# 📱 MDB CLI (Modified Debugging Bridge Command Line Interface)

**Version:** 1.0  
**Author:** Namish Kumar
**Date:** March 2025  

---

## 🚀 **Introduction**
The **MDB CLI** (Modified Debugging Bridge Command Line Interface) is a powerful and user-friendly Node.js-based tool designed for seamless wireless debugging and management of Android devices. It simplifies the process of executing common ADB (Android Debug Bridge) commands over a Wi-Fi connection, eliminating the need for USB cables. 

With MDB CLI, you can perform essential operations such as restarting, shutting down, and reconnecting to Android devices using their IP addresses. It also offers an interactive shell interface, making it easy for users to execute commands efficiently. To enhance reliability, the CLI includes automatic error logging, recording issues in an `Error.log` file with timestamps for better debugging and troubleshooting.

The project is built to address common pain points when dealing with ADB commands, especially in wireless debugging scenarios. Instead of manually typing long ADB commands, you can now use intuitive and simplified commands like `shutdown`, `restart`, and `reconnect` through the MDB CLI.

---

## ⚙️ **Features**
✅ **Wireless Device Connection:** Connect to Android devices over Wi-Fi by entering the IP address, eliminating the need for USB cables.  
✅ **Command Execution:** Perform key operations such as shutdown, restart, and reconnection directly from the shell interface.  
✅ **Error Logging:** Automatically logs any errors or issues encountered into an `Error.log` file with accurate timestamps.  
✅ **Interactive Shell:** Provides a seamless command-line interface with prompts and feedback for an efficient debugging experience.  
✅ **Dependency Management:** Automatically installs required dependencies when you run the CLI for the first time.  

---

## 🔥 **Prerequisites**
Before you begin using the MDB CLI, make sure you have the following installed on your system:
- **Node.js** (v14 or later) → Required to run the CLI.  
- **ADB (Android Debug Bridge)** → Required for connecting and interacting with Android devices.
---