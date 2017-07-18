import {Meteor} from "meteor/meteor";
import SimpleSchema from "simpl-schema";

import {Accounts} from "meteor/accounts-base";

export const validateNewUser = (user) => {

    const email = user.emails[0].address;

    const emailValidator = new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).newContext();
    emailValidator.validate({email});

    if (!emailValidator.isValid()) {
        throw new Error(emailValidator.validationErrors());
    }

    return true;
};
if (Meteor.isServer) {
    Accounts.validateNewUser(validateNewUser);
}


