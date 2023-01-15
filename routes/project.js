var express = require("express");
// var morgan = require("morgan");
// var bodyparser = require("body-parser");
var pool = require("./pool");
var router = express.Router();
// var app = express();







///////////////////////alldata///////////////////////
router.get('/longest-duration-movies',function(req,res){
  let query="SELECT tconst,primaryTitle,runtimeMinutes,genres FROM onitotech.movies  GROUP BY runtimeMinutes HAVING COUNT(runtimeMinutes) >= 1 ORDER BY runtimeMinutes DESC LIMIT 10"
  pool.query(query, function(error, result){
    if(error){
      res.status(500).json([])
    }
    
    else{
      
      res.status(200).json(result)}


})})


//insert newrecord database
router.post("/new-movie", (req, res) => {


  var query="insert into onitotech.movies(tconst,titleType,primaryTitle,runtimeMinutes,genres)values(?,?,?,?,?)"
  pool.query(
   query,
    [req.body.tconst, req.body.titleType, req.body.primaryTitle, req.body.runtimeMinutes,req.body.genres],
    (error, result) => {
      if (error) {
        res.status(500).json([])

      } else {
       
  res.send({ 
    "data":req.body ,
        "title":"success",
        "message":"Successfully Saved",
        "status":"200"
    });

        // res.status(200).json(result)   
      }
    }
  );
});

///////////////////////alldata///////////////////////
router.get('/top-rated-movies',function(req,res){
  let query="SELECT movies.tconst,primaryTitle,genres,averageRating FROM movies INNER JOIN ratings on movies.tconst=ratings.tconst where averageRating>6.0 order by averageRating desc"
  pool.query(query, function(error, result){
    if(error){
      res.status(500).json([])
    }
    
    else{
      
      res.status(200).json(result)}


})})
module.exports = router;
