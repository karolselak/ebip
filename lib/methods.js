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
        Articles.remove(id)
    },
    addItemType: function(newType) {
        newType = ItemTypeSchema.clean(newType);
        check(newType, ItemTypeSchema);
        newType.name = capitalizeFirstLetter(newType.name);
        return ItemTypes.insert(newType);
    },
    addItemTypeProperty: function(it_id, newProperty) {
        console.log(newProperty)
        newProperty.name = decapitalizeFirstLetter(newProperty.name);
        obj = PropertyTypeSchema.clean(newProperty);
        check(newProperty, PropertyTypeSchema);
        PropertyTypes.update({name: newProperty.name},newProperty, {upsert: true});
        ItemTypes.update({_id: it_id}, {$push: {properties: newProperty.name}});
    },
    removeItemTypeProperty: function(it_id, propertyIndex) {
        var unset = {$unset: {}};
        unset.$unset['properties.'+propertyIndex] = 1;
        console.log(unset)
        ItemTypes.update({_id: it_id}, unset, false, true)
        //ItemTypes.update({_id: it_id}, {$pull: {properties: null}})
    }
});
