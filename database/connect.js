const mongoose = require("mongoose");


let connectLocal = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/e-referral-system", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Local DB Connected");
    } catch (e) {
        console.log(e);
    }
};

let connectRemote = async () => {
    try {
        await mongoose
            .connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        console.log("Remote DB Connected");
    } catch (e) {
        console.log(e);
    }
};

if (process.env.NODE_ENV == "development") connectLocal();
else connectRemote();

mongoose.Promise = global.Promise;
