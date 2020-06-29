const fs = require('fs');

module.exports ={
        jobAddPage:function(req,res){
        let query1 = "SELECT * FROM staffs ORDER BY id DESC"; // query database to get all the players
    
            // execute query
            
            db.query(query1, (err, result) => {
                if (err) {
                    res.redirect('/maintenance');
                }else{
                    res.render('../views/maintenance/jobAdd', {
                        title: 'Mariano Marcos State University | Maintenance'
                        ,staff: result
                    });
                    
                }
              
                
                
            })
      },
    jobAdd: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let briefDescription = req.body.briefDescription;
        let moreInfo = req.body.moreInfo;
        let date = req.body.date;
        let time = req.body.time;
        let status = req.body.status
        let materialUsed = req.body.materialUsed;
        let size = req.body.quantity;
        let totalCost = req.body.totalCost;
        let pio = req.body.incharge;
        let vehicleInvolved = req.body.vehicleInvolved;
        let plateNumber = req.body.plateNumber;
        let uploadedFile = req.files.image;
        let receiptImage = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        receiptImage = plateNumber + '.' + fileExtension;
 
        let usernameQuery = "SELECT * FROM `jobs` WHERE plateNumber = '" + plateNumber + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/receipt/${receiptImage}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `jobs` (briefDescription, moreInfo, date, time, materialUsed, size, totalCost, pio, vehicleInvolved, plateNumber,receiptImage, status) VALUES ('" +briefDescription + "', '" + moreInfo + "', '" + date + "', '" + time + "', '" + materialUsed + "', '" + size + "','" + totalCost + "','" + pio + "','" + vehicleInvolved + "','" + plateNumber + "','" + receiptImage + "', '"+status+"' )";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/maintenance/add-work');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('../views/maintenance/jobAdd', {
                        message,
                        title: 'Mariano Marcos State University | Add inventory'
                    });
                }
            }
        });
    },

}