// Server localhost:3000
const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser")
const auth = require('./config.js');

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ejs
const ejs = require("ejs");

// MQTT
const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://192.168.0.54")

client.on("connect", ()=>{
    console.log("connected to MQTT")
    client.subscribe("Farm")
})

// MySQl
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '103717',
    database: 'nodedb'
});
connection.connect()
connection.on("connect", ()=>{
    console.log("connected to MySQL")
})

// socketio
const http = require("http")
const server = http.createServer(app)
const socket = require("socket.io")
const sio = socket(server)

// 소켓 클라이언트 연결 시
sio.on("connect", (socket)=>{
    console.log("connected to socket")
    
    socket.on("led_on_event", (event) => {
        console.log(event)
        client.publish("outTopic", JSON.stringify(event))
    })
    socket.on("led_off_event", (event) => {
        console.log(event)
        client.publishAsync("outTopic", JSON.stringify(event))
    })
})

// MQTT 센서 데이터 구독
client.subscribe('Farm')
client.on('message', function(topic, message) {
    console.log(topic)
    console.log(String(message))
    let temp = parseFloat(message.toString().substr(0, 4))
    let humi = parseFloat(message.toString().substr(6, 4))
    let bright = parseInt(message.toString().substr(12, 4))

    const today = new Date()
    let hours = ('0' + today.getHours()).slice(-2)
    let minutes = ('0' + today.getMinutes()).slice(-2)
    let seconds = ('0' + today.getSeconds()).slice(-2)

    const time = hours + ':' + minutes + ':' + seconds

    const update_sql = `INSERT INTO sensor (sen_time, sen_temp, sen_humi, sen_bright) VALUES ('${time}', ${temp}, ${humi}, ${bright})`
    connection.query(update_sql, (error, row)=>{
        if(error){
            console.log(error)
        }
    })
})

// navbar 생성 및 sensor데이터 송신
app.get("/", (request, response) => {
    
    response.render('index', { loginState: Boolean(auth.currentUser) });

});

app.get("/get-data", (request, response) => {
    connection.query("SELECT * FROM sensor", (err, rows) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            response.status(500).json({
                status: 500,
                message: 'Error executing query: ' + err.stack
            })
            return;
        }
        response.json(rows)
    });
})

app.get("/storage", (request, response) => {
    if(auth.currentUser){
        response.render("storage", { loginState: Boolean(auth.currentUser) })
    }else{
        response.redirect("/")
    }

});

app.get("/login", (request, response) => {
    response.render("login")
});

app.get("/members", (request, response) => {
    response.render("members")
});

// 로그인
app.post('/login/submit', (req, res) => {
    const { signInWithEmailAndPassword } = require("firebase/auth");

    signInWithEmailAndPassword (auth, req.body.email, req.body.password)
    .then((userCredential) => {
        res.redirect('/')
    })
    .catch((error) => {
        res.status(401).json({
            status: 401,
            message: "로그인 실패!"
        })
    });
})

// 회원가입
app.post('/members/submit', (req, res) => {
    const { createUserWithEmailAndPassword } = require("firebase/auth");

    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
            console.log("가입성공")
            res.render('login')
        })
    .catch((error) => {
            res.status(401).json({
                status: 401,
                message: "가입 실패! 이미 존재하는 아이디 입니다."
            })
        });
})

// 로그아웃
app.get('/logout', (req, res) => {
    const { signOut } = require("firebase/auth");
    signOut(auth).then(() => {
        res.redirect('/')
    }).catch((error) => {
        res.status(401).json({
            status: 401,
            message: "요청 실패!"
        })
    });
})

server.listen(PORT, (err)=>{ 
    if(err){
        return CSSConditionRule.log(err)
    }else{
        console.log("SERVER ID LISTENING NOW ON PORT", PORT)
    }
})

/* 

환장하겠다 증말 
해놓고 테스트도 할 줄 몰라 
이게 뭐하자는 건지 증말 
홍의선? 중탈 레츠고!

*/