function checkTime(req,res,next){
    const currTime = new Date().getHours();
    if(currTime > 22 || currTime < 8){
        return res.send("Non è orario per mangiare");
    };
    next();
};

module.exports = (checkTime);