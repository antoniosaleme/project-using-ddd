const mongoose = require('mongoose');

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDB {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      console.log('Connected to MongoDB');
      return true;
    } catch (error) {
      console.error('Error connecting to MongoDB: ', error);
      throw error;
    }
  }
}
