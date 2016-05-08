Articles = new Mongo.Collection('articles');
Institutions = new Mongo.Collection('institutions');
ItemTypes = new Mongo.Collection('itemTypes');
Attachments = new FS.Collection("attachments", {
    stores: [new FS.Store.GridFS("attachments")]
});


var schemaToItemType = function(schema, name, description, inheritsFrom) {
    var obj = {
        name: name,
        description: description,
        inheritsFrom: inheritsFrom,
        properties: []
    }
    for (var i in schema._schema) {
        if (/\./.test(i)) {
            continue;
        }
        obj.properties.push({
            name: i,
            expectedTypes: ['https://schema.org/Text'],
            description: schema._schema[i].label
        })
    }
    if (!ItemTypes.findOne({name: name})) {
        ItemTypes.insert(obj);
    }
}
if (Meteor.isClient) {
    Accounts.ui.config({ passwordSignupFields: 'USERNAME_ONLY' });
    Meteor.subscribe('articles');
    Meteor.subscribe('institutions');
    Meteor.subscribe('itemTypes');
    Meteor.subscribe('users');
    Meteor.subscribe('attachments');
}
if (Meteor.isServer) {
    schemaToItemType(ArticleSchema, 'article', 'artykuł publikowany w portalu ebip');

    Meteor.publish('articles',function() {
        return Articles.find();
    });
    Meteor.publish('institutions',function() {
        return Institutions.find();
    });
    Meteor.publish('itemTypes',function() {
        return ItemTypes.find();
    });
    Meteor.publish('users',function() {
        return Meteor.users.find();
    });
    Meteor.publish("attachments", function() {
        return Attachments.find();
    });
    Attachments.allow({
        'insert': function() {
            return true;
        },
        'download': function() {
            return true;
        }
    });
}
