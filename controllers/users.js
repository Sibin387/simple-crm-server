const models= require('../models');

exports.register = (req,res) =>{
    return models.User.findOne({
        username: req.body.username
    })
    .then(user=>{
        if(user){
            return res.status(422).json({message:'Username already exists. Please login'});
        }
        const newUser = new models.User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        });
        newUser.save();
        return res.json({ message:"Registration successful" })
    })
}

exports.login = (req,res) => {
    return models.User.findOne({
        username: req.body.username,
        password: req.body.password,
    })
    .then(user=>{
        if(!user){
            return res.status(422).json({message:'Invalid username or password'});
        }
        return res.json({ message:"Login successful" })
    });
}
exports.showChart = (req,res) =>{
  res.send(`<!DOCTYPE html>
  <html lang="en-US">
  <body>
  
  <h1>My Web Page</h1>
  
  <div id="piechart"></div>
  
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  
  <script type="text/javascript">
  // Load google charts
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  
  // Draw the chart and set the chart values
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work', 8],
    ['Eat', 2],
    ['TV', 4],
    ['Gym', 2],
    ['Sleep', 8]
  ]);
  
    // Optional; add a title and set the width and height of the chart
    var options = {'title':'My Average Day', 'width':550, 'height':400};
  
    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
  </script>
  
  </body>
  </html>
  `);
}
exports.createEnquiry = (req,res) =>{
    const newEnquiry = new models.Enquiry({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        note: req.body.note,
        status: req.body.status,
        //createdBy:''
    });
    newEnquiry.save();
    return res.json({ message:"Enquiry created successfully" })
}
exports.getEnquiry = (req,res) =>{
    console.log(req.query);
    const page = parseInt(req.query.page);
    const search = req.query.search;
    const limit = parseInt(req.query.limit);
    const skip = (page)*limit;

    const query = {
        $or:[
            { name: new RegExp(search,"i") },
            { email:new RegExp(search,"i") },
            { phone:new RegExp(search,"i") },
            { note:new RegExp(search,"i") },
            { status:new RegExp(search,"i") },
        ]
    };
    let count = 0;
    models.Enquiry.count(query)
    .then(c=>{
        count=c;
        return models.Enquiry.find(query)
        .limit(limit)
        .skip(skip)
        .sort({
            createdAt:'desc'
        });
    })
    .then(d=>{
        return res.json({ total: count, data: d});
    });
}