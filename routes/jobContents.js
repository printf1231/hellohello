module.exports ={
    jobContent:function(req,res){
        let query = "SELECT DATE_FORMAT(date,'%d %M %Y')AS date FROM jobs "; // query database to get all the players
        let staff = "SELECT *,DATE_FORMAT(date,'%d %M %Y')AS date FROM jobs j INNER JOIN staffs s WHERE j.pio = s.person; ";
        
            // execute query
           
            db.query(staff, (err, result) => {
                if (err) {
                    res.redirect('/maintenance');
                }else{
                    res.render('../views/maintenance/jobContent', {
                        title: 'Mariano Marcos State University | Maintenance'
                        ,jobContents: result
                    });
                   
              
                   
                    
                }
               console.log(result);
               
            })
      },
}