module.exports = {
    today:function(req,res){
    let query2 = "SELECT *,DATE_FORMAT(date,'%d %M %Y')AS DATE FROM jobs j INNER JOIN staffs s ON j.pio = s.person ORDER BY date DESC";
        // execute query


        db.query(query2, (err, results,fields) => {
            if (err) {
                res.redirect('/maintenance');
            }else{
                res.render('../views/maintenance/maintenance', {
                    title: 'Mariano Marcos State University | Maintenance'
                    ,today: results
                });
                
            }
            console.log(results);
            
        })
  },
  

};