# testPays

## How To Run

1. Set the Atlas URI connection parameter in `server/config.env` to your Connection String:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

2. Start the Express server:
```
cd server
npm install
npm install -g nodemon
nodemon server
```

3. Start the React app:
```
cd app/pays/
npm install
npm start
```
