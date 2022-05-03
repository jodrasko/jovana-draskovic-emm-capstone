const { MongoClient } = require("mongodb");
// const connectionString = process.env.ATLAS_URI;
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB}`;
console.log("connectionString=", connectionString);

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      console.log("err=", err);
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("emm_store");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  }
};
