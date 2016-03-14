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
ArticleSchema = new SimpleSchema({
    title: {
        type: String,
        label: 'article\'s title'
    },
    content: {
        type: String,
        label: 'article\'s content'
    }
    tags: {
        type: Object,
        label: 'RDF tags'
    }
});
