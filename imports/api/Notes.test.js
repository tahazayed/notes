import {Meteor} from "meteor/meteor";
import expect from "expect";

import {Notes} from "./Notes";


if (Meteor.isServer) {
    describe('Notes', function () {

        it('should insert new note', function () {
            const userId = 'testid';
            const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});
            expect(Notes.findOne({_id, userId})).toExist();

        });
    });
}