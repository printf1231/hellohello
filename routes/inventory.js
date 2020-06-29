module.exports = {
    getinventoryPage: (req, res) => {
        let query = "SELECT *,DATE_FORMAT(date,'%d %M %Y')AS DATE FROM `vehicle` ORDER BY id ASC"; // query database to get all the vehicles

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/inventory');
            }
            res.render('../views/vehicle/inventory', {
                title: 'Mariano Marcos State University | Add inventory'
                ,vehicles: result
            });
        });
    },
};
