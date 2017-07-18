/**
 * Created by taha.amin on 7/12/2017.
 */

import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import {Accounts} from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {

    const email = user.emails[0].address;

    const emailValidator = new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).newContext();
    emailValidator.validate({email});

    return true;
});


