const Contact = require('./contact.model');

const getData = (data) => {
    for (let property in data) {
        data[property] = data[property].replace(/<[^>]+>/g,'').replace(/\s+/gi, ' ').trim();

        if (data[property] === 'undefined' || !data[property]) delete data[property];
    }

    return { ...data };
};

module.exports.get = async (req, res) => {
    try {
        let find = {};

        if (req.query && req.query.search) {
            let search = new RegExp(req.query.search);
            find = {
                $or: [
                    { firstName: search },
                    { lastName: search },
                    { phone: search }
                ]
            }
        }

        let contacts = await Contact.find(find).sort({ createAt: -1 });

        if (!contacts) {
            return res.status(403).json({ message: "No contacts" });
        }

        return res.status(200).json({ data: contacts });
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

module.exports.getById = async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(403).json({ message: "Contact not found" });
        }

        return res.status(200).json({ data: contact });
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

module.exports.create = async (req, res) => {
    try {
        let params = getData(req.body);

        if (!params.firstName || !params.lastName || !params.phone) {
            return res.status(403).json({ message: "No data" });
        }
        if (params.phone.length < 10) {
            return res.status(403).json({ message: "Phone number must be at least 10 characters" });
        }
        if (params.phone.length === 10) {
            params.phone = 7 + params.phone;
        }

        let contact = await Contact.findOne({ phone: params.phone });

        if (contact) {
            return res.status(403).json({ message: "Contact does exists" });
        }

        contact = await new Contact(params).save();

        return res.status(201).json({ data: contact });
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

module.exports.update = async (req, res) => {
    try {
        let params = getData(req.body);

        if (params.phone) delete params.phone;

        let contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(403).json({ message: "Contact not found" });
        }

        for (let property in params) {
            contact[property] = params[property];
        }

        await contact.save();

        return res.status(200).json({ messasge: "success" });
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

module.exports.delete = async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(403).json({ message: "Contact not found" });
        }

        contact.delete();
        return res.status(200).json({ message: "success" });
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
};