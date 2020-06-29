module.exports = {
        vehicle:function(req,res){
        let query = "SELECT *,DATE_FORMAT(date,'%d %M %Y')AS DATE FROM `vehicle` ORDER BY id ASC"; // query database to get all the vehicle
    
            // execute query
           
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/vehicle');
                }else{
                    res.render('../views/vehicle/vehicle', {
                        title: 'Mariano Marcos State University | Vehicle Gallery',
                        vehicle: result
                    });
                    
                }
               
            })
      },
      print: (req, res) => {
        let vehicleId = req.params.id;
         let query = "SELECT * FROM `vehicle` WHERE id = '" + vehicleId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('../views/partials/spareForm', {
                title: 'Print'
                ,vehicle: result[0]
                ,message: ''
            });
        });
    },
};