const request = require('request')
const postsApi = 'https://jsonplaceholder.typicode.com/posts'

function getUsers(){
    return new Promise(function (resolve, reject) {
        request({
          url: `${postsApi}`,
          json: true
        }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            resolve(body)
          } else {
            reject(error || response.statusCode)
          }
        })
    })
}

module.exports = { getUsers };