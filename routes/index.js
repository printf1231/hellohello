module.exports = {
  home:function(req,res){
    res.render('../views/index/home',{
      title:'Home'
    })
  },
  about:function(req,res){
    res.render('../views/index/about',{
      title:'About'
    })
  },
  support:function(req,res){
    res.render('../views/index/support',{
      title:'Support'
    })
  },
};
