const mongoose = require('mongoose');

module.exports = ({ host, port, name, options }) => {
    let uri = `mongodb://${ host }:${ port }/${ name }`;

    mongoose.connect(uri, options);
    return mongoose.connection;
};