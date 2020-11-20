const request = require('request')
const apiUrl = 'https://jsonplaceholder.typicode.com';
const limit = 4;
const userId = 6;

function getPosts(req, res){
  request({
    url: `${apiUrl}/posts`,
    json: true
    }, function (error, response, body) {
      res.statusCode = response.statusCode
      if (!error && response.statusCode === 200) {
        // Only get 4 first elements of the userId: 6 results
        let onlyId6 = body.filter(item => item.userId == userId);
        result = onlyId6.slice(0, limit);
        res.send(result)
      } else {      
        res.send(error)
      }
  });
}
function getUsers(){
  return new Promise(function(resolve, reject ) { 
    request({
      url: `${apiUrl}/users`,
      json: true, 
    },function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // get all users by ids
        resolve(body)
      } else {      
        reject(error)
      }
    })
  })
}
function search(req, res){
  searchPost(req.query.search)
  .then((posts)=>{
    getUsers().then((users)=>{
      // in this context where we got all users in one request
      // we could make this less performant but to get each user info on each post, but doesnt make much sense
      mergedPosts = [];
      posts.map((post)=>{
        mergedPosts.push({
          user : users.find((usr)=>{return usr.id == post.userId}),
          post,
        })
      })
      res.send(mergedPosts)
    })
    .catch((e)=>{
      res.send(e)
    })
  })
  .catch((e)=>{
    res.send(e.statusCode)
  })
}

function searchPost(search){
  return new Promise(function(resolve, reject ) { 
    request({
      url: `${apiUrl}/posts`,
      json: true, 
    },function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // search by title
        let result = body.filter(item => item.title.includes(search));
        resolve(result)
      } else {      
        reject(error)
      }
    })
  })
}

module.exports = { getPosts, search };