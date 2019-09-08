angular.module('app').service('contactService', function() {
    let contactList = [];

    const parseDate = date => {
        date = new Date(date);
        let dateArr = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        ];

        dateArr = dateArr.map(item => {
            if (String(item).length < 2) {
                return `0${item}`;
            }
            return item;
        });

        return `${[dateArr[0], dateArr[1], dateArr[2]].join('-')} ${[dateArr[3], dateArr[4], dateArr[5]].join(':')}`;
    };

    const setContacts = (contacts) => {
        contactList = contacts.map(contact => {
            contact.createdAt = parseDate(contact.createdAt);
            return contact;
        })
    };

    const addContact = (contact) => {
        contact.createdAt = parseDate(contact.createdAt);
        contactList.push({ ...contact });
    };

    const getContactList = () => {
        return [ ...contactList ];
    };

    const getContact = id => {
        let contact = contactList.filter(contact => {
            return contact._id === id;
        });

        return contact.length ? contact[0] : {};
    };

    return { setContacts, addContact, getContactList, getContact };
});