import { logger } from "./logger";

const exceptionLogger = async (app) => {

    app.use(function (err, req, res, next) {
        console.log('==============exception section ==================')
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        
        // if (res.status(404)) {
        //     logger.info('404');
        // } else {
        //     logger.info('mmmmmm');
        // }

        logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    // handle global exceptions
    process.on('uncaughtException', function (err) {
        logger.error('global exception:', err.message);
    });

    process.on('unhandledRejection', function (reason: any, _promise) {
        logger.error('unhandled promise rejection:', reason.message || reason);
    });

    return null;
};

export default exceptionLogger;