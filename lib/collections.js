Articles = new Mongo.Collection('articles');
Institutions = new Mongo.Collection('institutions');
if (Meteor.isClient) {
    Accounts.ui.config({ passwordSignupFields: "USERNAME_ONLY" });
    Meteor.subscribe("articles");
    Meteor.subscribe("institutions");
}
if (Meteor.isServer) {
    Meteor.publish("articles",function() {
        return Articles.find();
    });
    Meteor.publish("institutions",function() {
        return Institutions.find();
    });
}
