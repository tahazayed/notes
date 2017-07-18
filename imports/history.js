import { createBrowserHistory } from 'history'

export default createBrowserHistory({
    forceRefresh: true,

    getUserConfirmation(message, callback) {
        console.log(message);
    }
});
//https://www.npmjs.com/package/history
