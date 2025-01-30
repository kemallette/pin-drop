# pin-drop
Just a little learning app in JS land

## Description
Pin Drop is a JavaScript application that allows users to save and share location pins on a map. Think of it as a simplified version of Google Maps pins or location bookmarking.

## Features
- Create location pins with custom names and descriptions
- View all pins on an interactive map
- Click pins to view details
- Delete pins you've created
- Share pins with other users via unique URLs

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser with JavaScript enabled

## Installation
1. Clone the [repository](https://github.com/your-username/pin-drop.git):

```bash
git clone https://github.com/your-username/pin-drop.git
```

2. Install dependencies:

```bash
npm install
```

3. Install MongoDB

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

4. Start the MongoDB service:

```bash
sudo systemctl start mongod
```

If you receive an error similar to the following when starting mongod:

Failed to start mongod.service: Unit mongod.service not found.

Run the following command first:

```bash
sudo systemctl daemon-reload
```

Then run the start command above again.

Verify that MongoDB has started successfully.

```bash
sudo systemctl status mongod
```

As needed, you can stop the mongod process with:

```bash
sudo systemctl stop mongod
```

You can restart the mongod process with:

```bash
sudo systemctl restart mongod
```

You can follow the state of the process for errors or important messages by watching the output in the /var/log/mongodb/mongod.log file.

Begin using MongoDB.
Start a mongosh session on the same host machine as the mongod. You can run mongosh without any command-line options to connect to a mongod that is running on your localhost with default port 27017.

```bash
mongosh
```

5. Start the server:

```bash
node server.js
```

4. Visit http://localhost:3000 in your mobile browser

## Usage
1. Open the application in your mobile browser
2. Select a layer to start pinning
3. Click on the map to place a new pin
4. Add a label and description to your pin
5. Share the unique URL with others to view your pin

## License
This project is open-sourced under the MIT License - see the LICENSE file for details.
