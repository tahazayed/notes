import {Meteor} from "meteor/meteor";
import expect from "expect";
import {Notes} from "./Notes";


if (Meteor.isServer) {

    describe('Notes', function () {

        const noteOne = {
            _id: 'testNote1Id',
            title: 'My Title',
            body: 'My Body',
            userId: 'testUser1Id',
            updatedAt: 0
        };
        const noteTwo = {
            _id: 'testNote2Id',
            title: 'My Title',
            body: 'My Body',
            userId: 'testUser2Id',
            updatedAt: 0
        };

        beforeEach(function () {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });
        afterEach(function () {
            Notes.remove({});
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
            const _id = Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);
            expect(Notes.findOne({_id: noteOne._id, userId: noteOne.userId})).toNotExist();

        });

        it('should not remove note if unauthenticated', function () {

            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
                }
            ).toThrow();

        });

        it('should not remove note if invalid _id', function () {

            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId});
                }
            ).toThrow();

        });

        it('should update note', function () {
            const title = 'This is an updated title';
            Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [noteOne._id, {title}]);
            const note = Notes.findOne(noteOne._id);
            expect(note.updatedAt).toBeGreaterThan(-2);
            expect(note).toInclude({
                title,
                body: noteOne.body
            });

        });

        it('should throw error if extra updates', function () {
            expect(() => {
                    const title = 'This is an updated title';
                    Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId},
                        [noteOne._id, {title, name: 'taha'}]);
                }
            ).toThrow();
        });

        it('should return a users notes', function () {
            const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
            const notes = res.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it('should return no notes for user that has none', function () {
            const res = Meteor.server.publish_handlers.notes.apply({userId: 'testid'});
            const notes = res.fetch();

            expect(notes.length).toBe(0);
        });
    });
}