import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import '../imports/startup/simple-schema-configuration.js';

import {routes, onAuthChange} from './../imports/routes/routes';
import {Session} from 'meteor/session';


Tracker.autorun(()=> {
    const isAuthenticated = !!Meteor.userId();

    onAuthChange(isAuthenticated);

});



Meteor.startup(()=> {

    ReactDOM.render(routes, document.getElementById('app'));
});
