module.exports ={
    staff:function(req,res){
        let query = "SELECT * FROM `staffs` ORDER BY id ASC"; // query database to get all the vehicles

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/staff');
            }
            res.render('../views/staff/staff', {
                title: 'Mariano Marcos State University | Staff'
                ,staff: result
            });
        });
    },
}