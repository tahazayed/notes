import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Accounts} from 'meteor/accounts-base';

import PrivateHeader from './PrivateHeader'

export default ()=> {
    return (
        <div>
            <PrivateHeader title='Dashboard'/>
            <div className="page-content">
                Dashboard content
            </div>
        </div>
    );
}
