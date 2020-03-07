const userService=require('../services/users')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
module.exports=passport=>{
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        const result=await userService.userFindUserId(jwt_payload.id);
        if(result.length===1){
            return done(null,result)
        }else{
            return done(null,false)
        }
    }));
}