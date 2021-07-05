const countryService = require('../services/countryService')
const logger = require('../services/logger')
module.exports = {
    getCountryList: async function (req, res) {
        try {
            const list = await countryService.getList()
            return res.status(200).send(list)
        } catch (err) {
            logger.error(`Error:: [getCountryList]: ${JSON.stringify(err)}`)
            return res.status(500).send(err)
        }


    },
    getCountryById: async function (req, res) {
        try {
            const id = req.params.id;
            const country = await countryService.getById(id)
            return res.status(200).send(country)
        } catch {
            logger.error(`Error:: [getCountryById]: ${JSON.stringify(err)}`)
            return res.status(500).send(err)
        }
    },
    addCountry: async function (req, res) {
        try {
            let newCountryObject = req.body;
            logger.debug(`requet body ${JSON.stringify(newCountryObject)}`);
            let newObject = await countryService.addCountry(newCountryObject)
            res.status(201).send(newObject)
        } catch (err) {
            logger.error(`Error:: [addCountry]: ${JSON.stringify(err)}`)
        }
    }
}