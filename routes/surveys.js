var express = require('express');
var router = express.Router();
var SURVEYS_LIST = require('../data/surveys');

var Survey = require('../models/surveys');


/* GET surveys listing. */
router.get('/', function (req, res, next) {

    Survey.find({}, function (err, surveys) {
        if (err) throw err;
        res.send(surveys);
    });
});

router.get('/:id', function (req, res, next) {
    
    var id = req.params.id;
    Survey.findOne({ _id: id }, function (err, surveys) {
        if (err) {
            return res.status(400).send({ msg: err });
        }
        res.send(surveys);
    });

});

router.post('/', function (req, res, next) {

    var data = req.body;
    console.log(data);
    var survey = new Survey({
        name: data.name,
        start: data.start,
        end: data.end,
        dls: data.dls,
        users: data.users,
        description: data.description,
    });

    survey.save(function (err) {
        if (err) {
            if (11000 === err.code || 11001 === err.code) {
                return res.status(400).send('Survey name must be unique');
            }
            return res.status(400).send(err);
        }
        res.status(200).send({ msg: 'Survey saved successfully!' });
    });

});

router.put('/:id', function (req, res, next) {

    var id = req.params.id;
    Survey.findByIdAndUpdate({ _id: id }, req.body, function (err) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send({ msg: 'Survey Updated successfully!' });
    });

});


router.delete('/:id', function (req, res, next) {

    var id = req.param.id;
    Survey.deleteOne({ _id: id }, function (err) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send({ msg: 'Survey Deleted successfully!' });
    });

});
module.exports = router;
