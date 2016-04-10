Articles = new Mongo.Collection('articles');
Institutions = new Mongo.Collection('institutions');
ItemTypes = new Mongo.Collection('itemTypes');
Attachments = new FS.Collection("attachments", {
    stores: [new FS.Store.FileSystem("attachments", {path: "~/uploads"})]
});

if (Meteor.isClient) {
    Accounts.ui.config({ passwordSignupFields: "USERNAME_ONLY" });
    Meteor.subscribe("articles");
    Meteor.subscribe("institutions");
    Meteor.subscribe("itemTypes");
    Meteor.subscribe("attachments");
}
if (Meteor.isServer) {
    Meteor.publish("articles",function() {
        return Articles.find();
    });
    Meteor.publish("institutions",function() {
        return Institutions.find();
    });
    Meteor.publish("itemTypes",function() {
        return ItemTypes.find();
    });
    Meteor.publish("attachments", function() {
        return Attachments.find();
    });
    Attachments.allow({
        'insert': function() {
            return true;
        }
    });
}
