var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const words = [
    { word: "China", size: "50", color: "#A4CABC" },
    { word: "India", size: "40", color: "#A4CABC" },
    { word: "Indonesia", size: "30", color: "#A4CABC" },
    { word: "Algeria", size: "40", color: "#EAB364" },
    { word: "Congo", size: "30", color: "#EAB364" },
    { word: "Sudan", size: "20", color: "#EAB364" },
    { word: "Russia", size: "60", color: "#DDA288" },
    { word: "Kazakhstan", size: "50", color: "#DDA288" },
    { word: "Ukraine", size: "40", color: "#DDA288" },
    { word: "Canada", size: "50", color: "#ACBD78" },
    { word: "America", size: "40", color: "#ACBD78" },
    { word: "Mexico", size: "30", color: "#ACBD78" },
    { word: "Brazil", size: "40", color: "#A5C3CF" },
    { word: "Columbia", size: "30", color: "#A5C3CF" },
    { word: "Argentina", size: "20", color: "#A5C3CF" },
  ]

  res.json(words)
});

module.exports = router