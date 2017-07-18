import {Meteor} from "meteor/meteor";
import expect from "expect";

import {Notes} from "./Notes";


if (Meteor.isServer) {

    describe('Notes', function () {

        beforeEach(function () {
            Notes.remove({});
            Notes.insert({
                _id: 'testNoteId1',
                title: 'My Title',
                body: 'My Body',
                userId: 'testUserId1',
                updatedAt: 0
            })
        });

        it('should insert new note', function () {
            const userId = 'testid';
            const _id = Meteor.server.method_handlers['notes.insert'].apply({userId: userId});

            expect(Notes.findOne({_id, userId})).toExist();

        });

        it('should not insert note when not authenticated', function () {

            expect(() => {
                    Meteor.server.method_handlers['notes.insert']();
                }
            ).toThrow();

        });
        it('should remove note', function () {
            const _id = Meteor.server.method_handlers['notes.remove'].apply({userId: 'testUserId1'}, ['testNoteId1']);
            expect(Notes.findOne({_id: 'testNoteId1', userId: 'testUserId1'})).toNotExist();

        });

        it('should not remove note if unauthenticated', function () {

            expect(() => {
                    Meteor.server.method_handlers['notes.remove'].apply({}, ['testNoteId1']);
                }
            ).toThrow();

        });

        it('should not remove note if invalid _id', function () {

            expect(() => {
                    Meteor.server.method_handlers['notes.remove'].apply({userId: 'testUserId1'});
                }
            ).toThrow();

        });
    });
}