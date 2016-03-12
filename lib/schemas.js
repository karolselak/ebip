InstitutionSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'institution unique name'
    },
    officials: {
        type: Object,
        optional: true,
        label: 'officials of institution (presitents, ministers etc.)'
    }
});
//TODO Kaj: analogiczny schemat dla dokumentu + pomyśleć nad polami
//In progress
ArticleSchema = new SimpleSchema({
    title: {
        type: String,
        label: 'article\'s title'
    },
    content: {
        type: Object,
        label: 'article\'s content'
    }
});
