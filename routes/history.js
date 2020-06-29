const fs = require('fs');
module.exports ={
    history:function(req,res){
        let query1 = "SELECT *,DATE_FORMAT(date,'%d %M %Y')AS DATE FROM jobs ORDER BY date DESC"; // query database to get all the players
    
            // execute query
            
            db.query(query1, (err, result) => {
                if (err) {
                    res.redirect('/maintenance');
                }else{
                    res.render('../views/maintenance/history', {
                        title: 'Mariano Marcos State University | Maintenance'
                        ,history: result
                    });
                    
                }
              
                
                
            })
           
      },
      jobEditPage: (req, res) => {
        let jobId = req.params.id;
         let query = "SELECT *,DATE_FORMAT(date,'%d %M %Y')AS DATE FROM `jobs` WHERE id = '" + jobId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('../views/maintenance/jobEdit', {
                title: 'Edit'
                ,jobs: result[0]
                ,message: ''
            });
            
        });
       
    },
    jobEdit: (req, res) => {
        let jobId = req.params.id;
        let briefDescription = req.body.briefDescription;
        let moreInfo = req.body.moreInfo;
        // let date = req.body.date;
        // let time = req.body.time;
        let status = req.body.status
        let materialUsed = req.body.materialUsed;
        let size = req.body.quantity;
        let totalCost = req.body.totalCost;
        let pio = req.body.incharge;
        let vehicleInvolved = req.body.vehicleInvolved;
        let plateNumber = req.body.plateNumber;

        let query = "UPDATE `jobs` SET `briefDescription` = '" + briefDescription + "', `moreInfo` = '" + moreInfo + "',`status` = '" + status + "',`materialUsed` = '" + materialUsed + "', `size` = '" + size + "', `totalCost` = '" + totalCost + "', `pio` = '" + pio + "', `vehicleInvolved` = '" + vehicleInvolved + "', `plateNumber` = '" + plateNumber + "' WHERE `jobs`.`id` = '" + jobId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/maintenance/history');
        });
      
    },
    deletejob: (req, res) => {
        let jobId = req.params.id;
        let getImageQuery = 'SELECT receiptImage from `jobs` WHERE id = "' + jobId + '"';
        let deletevehicleQuery = 'DELETE FROM jobs WHERE id = "' + jobId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].receiptImage;

            fs.unlink(`public/assets/receipt/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deletevehicleQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/maintenance/history');
                });
            });
        });

    }

}