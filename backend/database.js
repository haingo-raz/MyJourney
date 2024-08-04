const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myjourney'
})

function login(res, user){
    let sql = "SELECT * FROM users WHERE email = '" + user.email + "' AND password = '" + user.password + "'";

    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        if (result.length > 0) 
            return res.json("Success");
        else return res.json("Invalid email or password");
    });
}

function getWorkout(res){
    let sql = "SELECT * FROM workout";

    //Execute query and output results
    db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
    });
}

module.exports.getWorkout = getWorkout;
module.exports.login = login;