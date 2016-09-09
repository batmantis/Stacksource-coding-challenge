var router = require('express').Router();
module.exports = router;

var zipcodeList = {}

function validateZipcode (zipcode) {
  return zipcode.search(/^[0-9][0-9][0-9][0-9][0-9]$/) >= 0
}

function formatZipcodeList (list) {
  var zipcodes = Object.keys(list)
  zipcodes = zipcodes.map(function(zipcode) {
    if (list[(+zipcode - 1).toString()]) {
      if (list[(+zipcode + 1).toString()]) {
        return ''
      } else {
        return '-' + zipcode
      }
    }
    return zipcode
  })
  zipcodes = zipcodes.join(', ')
  zipcodes = zipcodes.replace(/(, )+\-/, '-')
  return zipcodes
}

router.post('/insert/:zipcode', function (req, res) {
  if (!validateZipcode(req.params.zipcode)) {
    var message = 'Invalid zipcode'
  } else {
    zipcodeList[req.params.zipcode] = true;
    var message = 'Inserted ' + req.params.zipcode;
  }
  console.log(message);
  res.send(message);
})

router.delete('/delete/:zipcode', function (req, res) {
  if (zipcodeList[req.params.zipcode]) {
    delete zipcodeList[req.params.zipcode];
    var message = 'Deleted ' + req.params.zipcode;
  } else {
    var message = req.params.zipcode + 'is not a stored zipcode'
  }
  console.log(message);
  res.send(message);
})

router.get('/has/:zipcode', function (req, res) {
  var message = !!zipcodeList[req.params.zipcode];
  res.send(message);
  console.log(message);
})

router.get('/display', function (req, res) {
  var zipcodes = formatZipcodeList(zipcodeList)
  console.log(zipcodes);
  res.send(zipcodes);
})
