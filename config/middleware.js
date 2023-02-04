module.exports.setFlash = async function(req,res,next){
    res.locals.flash = {
        'success'  : await req.consumeFlash('success'),
        'error': await req.flash('error')
    }
    next();
}