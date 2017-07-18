import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import moment from "moment";
export const Notes = Mongo.Collection('note');

Meteor.methods({
    'notes.insert'(){
        if (!this.userId) {
            throw new Error('not-authorized');
        }

        Notes.insert({
            title: '',
            body: '',
            UserId: this.userId,
            updatedAt: moment.valueOf()
        });
    }
});