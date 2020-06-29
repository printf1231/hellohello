const fs = require('fs');
module.exports = {

    addstaffPage: (req, res) => {
        res.render('../views/staff/addStaff', {
            title: 'Mariano Marcos State University | Add Staff'
            ,message: ''
        });
    },
    addstaff: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let first = req.body.first;
        let mid = req.body.mid;
        let last = req.body.last;
        let person = first+' '+last
        let age = req.body.age;
        let position = req.body.position;
        let idNumber = req.body.idNumber;
        let contact = req.body.contact;
        let email = req.body.email;
        let bday = req.body.bday;
        let address = req.body.address;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = idNumber + '.' + fileExtension;
 
        let usernameQuery = "SELECT * FROM `staffs` WHERE idNumber = '" + idNumber + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/staffs/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `staffs` (first, mid, last, person, age, position,image, idNumber,contact, email, bday, address) VALUES ('" +
                            first + "', '" + mid + "','" + last + "','" + person + "','" + age + "', '" + position + "', '" + image_name + "','" + idNumber + "','" + contact + "','" + email + "','" + bday + "','" + address + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/staff');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('addStaff', {
                        message,
                        title: 'Mariano Marcos State University | Add Staff'
                    });
                }
            }
        });
    },
    viewStaff: (req, res) => {
        let Id = req.params.id;
         let query = "SELECT *,DATE_FORMAT(bday,'%d-%M-%Y')AS BDAY FROM `staffs` WHERE id = '" + Id + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('../views/staff/staffview', {
                title: 'View Staff'
                ,staff: result[0]
                ,message: ''
            });
        });
    },
    update: (req, res) => {
        let Id = req.params.id;
        let first = req.body.first;
        let mid = req.body.mid;
        let last = req.body.last;
        let person = first+' '+last
        let age = req.body.age;
        let position = req.body.position;
        let idNumber = req.body.idNumber;
        let contact = req.body.contact;
        let email = req.body.email;
        let address = req.body.address;

        let query = "UPDATE `staffs` SET `first` = '" + first + "', `mid` = '" + mid + "',`last` = '" + last + "',`person` = '" + person + "',`age` = '" + age + "',`position` = '" + position + "',`idNumber` = '" + idNumber + "',`contact` = '" + contact + "',`email` = '" + email + "',`address` = '" + address + "' WHERE `staffs`.`id` = '" + Id + "'" ;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/staff');
        });
    },
    deleteStaff: (req, res) => {
        let Id = req.params.id;
        let getImageQuery = 'SELECT image from `staffs` WHERE id = "' + Id + '"';
        let deleteStaffQuery = 'DELETE FROM staffs WHERE id = "' + Id + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/staffs/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteStaffQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/staff');
                });
            });
        });
    }
}
