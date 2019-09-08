angular.module('app').service('contactService', [
    '$http',
    function($http) {
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

        const getContactFromServer = (api_url, id, callback) => {
            if (!api_url || !id) {
                return callback && callback();
            }

            let url = [api_url, 'contact', id].join('/');

            $http.get(url)
                .then((response) => {
                    if (response.status && response.status === 200 && response.data && response.data.data) {
                        let contact = { ...response.data.data };
                        contact.createdAt = parseDate(contact.createdAt);
                        return callback && callback(null, contact);
                    }
                    callback && callback(null, null, response);
                })
                .catch(err => {
                    callback && callback(err);
                });
        };

        const addContact = (api_url, contact, callback) => {
            if (!api_url || !contact) {
                return callback && callback();
            }

            let url = [api_url, 'contact', 'create'].join('/');

            $http.post(url, contact)
                .then(response => {
                    let { status, data } = response;

                    if (status && status === 201 && data) {
                        if (data.data) {
                            let _contact = data.data;
                            _contact.createdAt = parseDate(_contact.createdAt);
                            contactList.push({ ..._contact });
                            return callback && callback(null, _contact, response);
                        }
                    }

                    callback && callback(null, null, response);
                })
                .catch(err => {
                    callback && callback(err);
                })
        };

        const updateContact = (api_url, id, contact, callback) => {
            if (!api_url || !id || !contact) {
                return callback && callback();
            }

            let url = [api_url, 'contact', 'update', id].join('/');

            $http.put(url, contact)
                .then(response => {
                    let { status } = response;

                    if (status && status === 200) {
                        contactList = contactList.map(_contact => {
                            if (_contact._id === id) {
                                for (let property in contact) {
                                    _contact[property] = contact[property];
                                }
                                contact = { ..._contact };
                            }

                            return _contact;
                        });

                        return callback && callback(null, contact, response);
                    }

                    callback && callback(null, null, response);
                })
                .catch(err => {
                    callback && callback(err);
                })
        };

        const getContactList = (api_url, search, callback) => {
            if (!api_url) {
                return callback && callback();
            }

            let url = `${[api_url, 'contact'].join('/')}?search=${search}`;

            $http.get(url)
                .then(response => {
                    if (response.status && response.status === 200 && response.data && response.data.data) {
                        let contacts = response.data.data;
                        contactList = contacts.map(contact => {
                            contact.createdAt = parseDate(contact.createdAt);
                            return contact;
                        });
                        return callback && callback(null, contactList);
                    }
                    callback && callback(null, null, response);
                })
                .catch(err => {
                    callback && callback(err);
                })
        };

        const getContact = (api_url, id, callback) => {
            if (!api_url || !id) {
                return callback && callback();
            }

            let contact = contactList.filter(contact => {
                return contact._id === id;
            });

            if (contact && contact.length) {
                return callback && callback(null, contact[0]);
            }

            getContactFromServer(api_url, id, callback);
        };

        const deleteContact = (api_url, id, callback) => {
            if (!api_url || !id) {
                return callback && callback();
            }

            let url = [api_url, 'contact', 'delete', id].join('/');

            $http.delete(url)
                .then(({status}) => {
                    if (status && status === 200) {
                        contactList = contactList.filter(contact => {
                            return contact._id !== id;
                        });
                    }
                    callback && callback(null, contactList);
                })
                .catch(err => {
                    callback && callback(err);
                })
        };

        return {
            addContact,
            updateContact,
            getContactList,
            getContact,
            deleteContact
        };
    }
]);