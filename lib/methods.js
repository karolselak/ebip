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
    addArticle: function(newArticle) {
        newArticle = ArticleSchema.clean(newArticle);
        check(newArticle, ArticleSchema);
        var id = Articles.insert(newArticle);
        return id;
    }
});
