class MainController {

    sendResponse = (res, success, data, message = '', statusCode = 200) => {
        const response = {
            status: statusCode,
            success,
            message,
            data,
        };
        return res.status(statusCode).json(response);
    }

    getHome = async (req, res) => {
        try {
            const data = { message: 'Welcome to the API!' };
            this.sendResponse(res, true, data);
        } catch (error) {
            this.sendResponse(res, false, null, 'Internal Server Error', 500);
        }
    }
}

module.exports = MainController; // صادرات کلاس
