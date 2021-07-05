const countries = require('./../data/data.json').countries
const _ = require('lodash')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')






module.exports = {
    getList: async function () {
        return countries;
    },
    getById: async function (id) {
        const country = _.find(countries, function (object) {
            if (object.id === id) {
                return object
            }
        })
        if (country === undefined) {
            return "country Not Found"
        }
        return country;
    },
    addCountry: async function (newObject) {
        newObject.id = uuidv4();
        const fileData = fs.readFileSync('./../data/data.json')
        const data = JSON.parse(fileData)
        if (data.countries) {
            data.countries.push(newObject);
            try {
                fs.writeFileSync('./../data/data.json', JSON.stringify(data))
                return newObject;
            } catch (err) {
                throw err
            }

        } else {
            // err
        }
    }
}