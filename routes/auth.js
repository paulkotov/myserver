var passport = require('passport');

module.exports = function (app) {
    const mustBeAuthentificated = (res, req, next) => {
        if(req.isAuthentificated()){
            next();
        }
        else {
            res.redirect("/auth");
        }
    }

    app.get('/auth', function (req, res) {

        if (req.isAuthenticated()) {
            res.redirect('/');
            return;
        }

        res.render('auth', {
            error: req.flash('error')
        });
    });

    app.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/auth', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth',
        failureFlash: true })
    );


}
