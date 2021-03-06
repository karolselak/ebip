Meteor.methods({
    addInstitution: function(newInstitution) {
        if (! Meteor.user()) {
            throw '# Adding institution failed - you are not signed in';
        }
        if (! Meteor.user().GlobalRight===true) {
            throw '# Adding institution failed - you have not global rights';
        }
        newInstitution = InstitutionSchema.clean(newInstitution); //czyścimy formularz ze śmieci
        //newInstitution.author_id = Meteor.userId();

        check(newInstitution, InstitutionSchema);
        //sprawdzamy poprawność formularza (gdy zły, wywala błąd)

        var id = Institutions.insert(newInstitution);
        return id;
    },
    removeInstitution: function(id) {
        if (! Meteor.userId()) {
            throw '# Adding institution failed - you are not signed in';
        }
        if (! Meteor.user().GlobalRight===true) {
            throw '# Adding institution failed - you have not global rights';
        }
        Articles.remove({institution_id: id});
        Institutions.remove(id);
    },
    addArticle: function(newArticle) {
        if (! Meteor.userId()) {
            throw '# Adding institution failed - you are not signed in';
        }
        var inst = -1;
        if(Meteor.user().institutions){
            inst = Meteor.user().institutions.indexOf(newArticle.institution_id);
        }
        if (inst === -1){
          if (! Meteor.user().GlobalRight===true ) {
              throw '# Adding institution failed - you have not rights for this institution';
          }
        }
        var sch = ArticleSchema._schema;
        var itemType = ItemTypes.findOne({name: newArticle.type});
        if (itemType) {
            extendItemType(itemType);
        }
        //var extensions = newArticle.extensions;
        //newArticle = ArticleSchema.clean(newArticle);
        //check(newArticle, ArticleSchema);
        //TODO schematy tworzone w locie na podstawie słownika
        //newArticle.extensions = extensions;
        var id = Articles.insert(newArticle);
        return id;
    },
    updateArticle: function(id, obj) {
        if (! Meteor.userId()) {
            throw '# Adding institution failed - you are not signed in';
        }
        var inst = -1;
        if(Meteor.user().institutions){
            inst = Meteor.user().institutions.indexOf(newArticle.institution_id);
        }
        if (inst === -1){
          if (! Meteor.user().GlobalRight===true ) {
              throw '# Adding institution failed - you have not rights for this institution';
          }
        }
        Articles.update(id, obj);
    },
    removeArticle: function(id) {
        if (! Meteor.userId()) {
            throw '# Adding institution failed - you are not signed in';
        }
        var article = Articles.findOne(id);
        var inst=-1;
        if(Meteor.user().institutions){
          inst= Meteor.user().institutions.indexOf(article.institution_id);
        }
        if(inst===-1){
          if (! Meteor.user().GlobalRight===true ) {
              throw '# Adding institution failed - you have not rights for this institution';
          }
        }
        if (article && article.attachment_id) {
            Attachments.remove(article.attachment_id);
        }
        Articles.remove(id);
    },
    addItemType: function(newType) {
        if (!Meteor.user() || !Meteor.user().GlobalRight) {
            throw '# Adding item type failed - you have not global admin rights';
        }
        newType = ItemTypeSchema.clean(newType);
        check(newType, ItemTypeSchema);
        newType.name = capitalizeFirstLetter(newType.name);
        if (ItemTypes.findOne({name: newType.name})) {
            throw '# Adding item type failed - type with name '+newType.name+' already exists';        
        }
        return ItemTypes.insert(newType);
    },
    addItemTypeProperty: function(it_id, newProperty) {
        if (!Meteor.user() || !Meteor.user().GlobalRight) {
            throw '# Adding property failed - you have not global admin rights';
        }        
        newProperty.name = decapitalizeFirstLetter(newProperty.name);
        obj = PropertyTypeSchema.clean(newProperty);
        check(newProperty, PropertyTypeSchema);
        PropertyTypes.update({name: newProperty.name},newProperty, {upsert: true});
        ItemTypes.update({_id: it_id}, {$push: {properties: newProperty.name}});
    },
    removeItemTypeProperty: function(it_id, propertyIndex) {
        if (!Meteor.user() || !Meteor.user().GlobalRight) {
            throw '# Removing property failed - you have not global admin rights';
        }
        var unset = {$unset: {}};
        unset.$unset['properties.'+propertyIndex] = 1;

        //ItemTypes.update({_id: it_id}, unset, false, true)
        ItemTypes.update({_id: it_id}, unset)
        ItemTypes.update({_id: it_id}, {$pull: {properties: null}});
        //ItemTypes.update({_id: it_id}, unset, false, true)
    },
    addGlobalAdminRights: function(user_name) {
        if (! Meteor.user()) {
            throw '# Adding institution failed - you are not signed in';
        }
        if (! Meteor.user().GlobalRight===true) {
            throw '# Adding institution failed - you have not global rights';
        }
        var user=Meteor.users.findOne({username : user_name});
        Meteor.users.update({"_id": user._id },{$set : {"GlobalRight": true}});
    },
    addAdminRights: function(user_name,institutions_names) {
        if (! Meteor.user()) {
            throw '# Adding institution failed - you are not signed in';
        }
        if (! Meteor.user().GlobalRight===true) {
            throw '# Adding institution failed - you have not global rights';
        }
        var user=Meteor.users.findOne({username : user_name});
        Meteor.users.update({"_id": user._id },{$set : {"GlobalRight": false, "institutions":institutions_names}});
    },
    removeGlobalAdminRights:function(user_name) {
      if (! Meteor.user()) {
          throw '# Adding institution failed - you are not signed in';
      }
      if (! Meteor.user().GlobalRight===true) {
          throw '# Adding institution failed - you have not global rights';
      }
        var user=Meteor.users.findOne({username : user_name});
        Meteor.users.update({"_id": user._id },{$set : {"GlobalRight": false}});
    },

});
