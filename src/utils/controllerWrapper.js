export const controllerWrapper = controller => {
    const wrapperFunction = async(req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (err) {
            next(err);
        }
    };
    return wrapperFunction;
};
