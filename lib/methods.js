Meteor.methods({
    addInstitution: function(newInstitution) {
        /*if (! Meteor.userId()) {
            throw '# Adding institution failed - you are not signed in';
        }*/
        newInstitution = InstitutionSchema.clean(newInstitution); //czyścimy formularz ze śmieci
        //newInstitution.author_id = Meteor.userId();

        check(newInstitution, InstitutionSchema);
        //sprawdzamy poprawność formularza (gdy zły, wywala błąd)

        var id = Institutions.insert(newInstitution);
        return id;
    },
    removeInstitution: function(id) {
        Articles.remove({institution_id: id});
        Institutions.remove(id);
    },
    addArticle: function(newArticle) {
        var extensions = newArticle.extensions;
        newArticle = ArticleSchema.clean(newArticle);
        check(newArticle, ArticleSchema);
        newArticle.extensions = extensions;
        var id = Articles.insert(newArticle);
        return id;
    },
    removeArticle: function(id) {
        var article = Articles.findOne(id);
        Attachments.remove(article.attachment_id);
        Articles.remove(id);
    },
    addItemType: function(newType) {
        newType = ItemTypeSchema.clean(newType);
        check(newType, ItemTypeSchema);
        return ItemTypes.insert(newType);
    },
    addItemTypeProperty: function(it_id, newProperty) {
        var obj = {
            name: '.',
            description: '.',
            properties: [newProperty]
        }
        obj = ItemTypeSchema.clean(obj);
        check(obj, ItemTypeSchema);
        return ItemTypes.update({_id: it_id}, {$push: {properties: obj.properties[0]}});
    },
    removeItemTypeProperty: function(it_id, propertyIndex) {
        var unset = {$unset: {}};
        unset.$unset['properties.'+propertyIndex] = 1;
        ItemTypes.update({_id: it_id}, unset)
        ItemTypes.update({_id: it_id}, {$pull: {properties: null}})
    },
    addGlobalAdminRights: function(user_name) {
        var user=Meteor.users.findOne({username : user_name});
        Meteor.users.update({"_id": user._id },{$set : {"GlobalRight": true}}) 
    },
    addAdminRights: function(user_name,institutions_names) {
        var user=Meteor.users.findOne({username : user_name});
        Meteor.users.update({"_id": user._id },{$set : {"GlobalRight": false, "institutions":institutions_names}}) 
    }
});
