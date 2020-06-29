const fs = require('fs');

module.exports = {
    addVehiclePage: (req, res) => {
        res.render('../views/vehicle/inventoryAdd', {
            title: 'Mariano Marcos State University | Add inventory'
            ,message: ''
        });
    },
    addVehicle: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let brand = req.body.brand;
        let date = req.body.date;
        let category = req.body.category;
        let cost = req.body.cost;
        let plate = req.body.plate;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let health = req.body.health;
        let repairs = req.body.repairs;
        let availability = req.body.availability;
        let pendingjobs = req.body.pendingjobs;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = plate + '.' + fileExtension;
 
        let usernameQuery = "SELECT * FROM `vehicle` WHERE plate = '" + plate + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `vehicle` (brand, date, category, cost, image, plate, health, repairs, availability, pendingjobs) VALUES ('" +
                            brand + "', '" + date + "', '" + category + "', '" + cost + "', '" + image_name + "', '" + plate + "','" + health + "','" + repairs + "','" + availability + "','" + pendingjobs + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/inventory');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('inventoryAdd', {
                        message,
                        title: 'Mariano Marcos State University | Add inventory'
                    });
                }
            }
        });
    },
    editVehiclePage: (req, res) => {
        let vehicleId = req.params.id;
         let query = "SELECT * FROM `vehicle` WHERE id = '" + vehicleId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('../views/vehicle/inventoryEdit', {
                title: 'Edit'
                ,vehicle: result[0]
                ,message: ''
            });
        });
    },
    editVehicle: (req, res) => {
        let vehicleId = req.params.id;
        let brand = req.body.brand;
        let date = req.body.date;
        let category = req.body.category;
        let cost = req.body.cost;
        let health = req.body.health;
        let repairs = req.body.repairs;
        let availability = req.body.availability;
        let pendingjobs = req.body.pendingjobs;

        let query = "UPDATE `vehicle` SET `brand` = '" + brand + "', `date` = '" + date + "',`health` = '" + health + "',`repairs` = '" + repairs + "',`availability` = '" + availability + "',`pendingjobs` = '" + pendingjobs + "', `category` = '" + category + "', `cost` = '" + cost + "' WHERE `vehicle`.`id` = '" + vehicleId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/inventory');
        });
    },
    deleteVehicle: (req, res) => {
        let vehicleId = req.params.id;
        let getImageQuery = 'SELECT image from `vehicle` WHERE id = "' + vehicleId + '"';
        let deletevehicleQuery = 'DELETE FROM vehicle WHERE id = "' + vehicleId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deletevehicleQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/inventory');
                });
            });
        });
    }
};
