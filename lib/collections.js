Articles = new Mongo.Collection('articles');
Institutions = new Mongo.Collection('institutions');
ItemTypes = new Mongo.Collection('itemTypes');
PropertyTypes = new Mongo.Collection('propertyTypes');
Attachments = new FS.Collection("attachments", {
    stores: [new FS.Store.FileSystem("attachments", {path: "~/uploads"})]
});
var myDomain = 'http://localhost:3000/';
WhatIs = {
    articles: myDomain + 'directory/Article',
    institutions: myDomain + 'directory/Institution'
}
decomposeLabel = function(label) {
    var regEx = /\[.*\]/;
    var str = regEx.exec(label);
    var desc = label && label.replace(regEx, '');
    desc = desc && desc.trim();
    var result = {desc: desc};
    if (str) {
        var types = str[0];
        types = types.slice(1, types.length - 1);
        result.types = types.split(', ');
        var sameAs = str[1];
        sameAs = sameAs && sameAs.slice(1, str.length - 1);
        result.sameAs = sameAs;
    }
    return result;
}

var schemaToItemType = function(schema, obj) {
    if (!ItemTypes.findOne({name: obj.name})) {    
        obj.properties = [];
        for (var i in schema._schema) {
            if (/\./.test(i)) {
                continue;        
            }
            var el = schema._schema[i];
            var expectedTypes = ['https://schema.org/Text'];
            var r = decomposeLabel(el.label);
            if (r.types) {
                expectedTypes = expectedTypes.concat(r.types);
            }
            PropertyTypes.insert({
                name: i,
                expectedTypes: expectedTypes,
                description: r.desc,
                sameAs: r.sameAs
            });
            obj.properties.push(i);
        }    
        ItemTypes.insert(obj);
    }
}
if (Meteor.isClient) {
    Accounts.ui.config({ passwordSignupFields: 'USERNAME_ONLY' });
    Meteor.subscribe('articles');
    Meteor.subscribe('institutions');
    Meteor.subscribe('itemTypes');
    Meteor.subscribe('propertyTypes');
    Meteor.subscribe('users');
    Meteor.subscribe('attachments');
}
if (Meteor.isServer) {
    schemaToItemType(ArticleSchema, {
        name: 'Article',
        description: 'artykuł publikowany w portalu ebip'
    });
    schemaToItemType(InstitutionSchema, {
        name: 'Institution',
        description: 'instytucja w portalu ebip',
        sameAs: 'http://schema.org/GovernmentOrganization'
    });
    Meteor.publish('articles',function() {
        return Articles.find();
    });
    Meteor.publish('institutions',function() {
        return Institutions.find();
    });
    Meteor.publish('itemTypes',function() {
        return ItemTypes.find();
    });
    Meteor.publish('propertyTypes',function() {
        return PropertyTypes.find();
    });
    Meteor.publish('users',function() {
        return Meteor.users.find();
    });
    //Meteor.publish("attachments", function() {
    //    return Attachments.find();
    //});
    Attachments.allow({
        'insert': function() {
            return true;
        },
        'download': function() {
            return true;
        }
    });
}
