import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import moment from "moment";
import SimpleSchema from "simpl-schema";


export const Notes = new Mongo.Collection('note');

Meteor.methods({
    'notes.insert'(){
        if (!this.userId) {
            throw new Error('not-authorized');
        }

        return Notes.insert({
            title: '',
            body: '',
            userId: this.userId,
            updatedAt: moment.valueOf()
        });
    },
    'notes.remove'(_id){
        if (!this.userId) {
            throw new Error('not-authorized');
        }
        const idValidator = new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).newContext();
        idValidator.validate({_id});
        if (idValidator.isValid()) {
            Notes.remove({_id, userId: this.userId});
        }
        else {
            throw new Error('Invalid-Id');
        }
    },
    'notes.update'(_id, updates){
        if (!this.userId) {
            throw new Error('not-authorized');
        }
        const idValidator = new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            title: {
                type: String,
                optional: true
            },
            body: {
                type: String,
                optional: true
            }
        }).newContext();
        idValidator.validate({
            _id,
            ...updates
        });
        if (idValidator.isValid()) {
            Notes.update({_id, userId: this.userId}, {
                $set: {
                    updatedAt: moment.valueOf(),
                    ...updates
                }
            });
        }
        else {
            throw new Error(idValidator.validationErrors());
        }
    }
});