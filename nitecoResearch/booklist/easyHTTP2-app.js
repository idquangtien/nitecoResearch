const http = new EasyHTTP;

// get Users
// http.get("https://jsonplaceholder.typicode.com/posts")
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//     ;

//  User Data

const data = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'jdoe@gmail.com'
}

// create user POST
// http.post("https://jsonplaceholder.typicode.com/users", data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//     ;

// update put
// http.put("https://jsonplaceholder.typicode.com/users/2", data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//     ;


// delete put
http.delete("https://jsonplaceholder.typicode.com/users/2", data)
    .then(data => console.log(data))
    .catch(err => console.log(err))
    ;

