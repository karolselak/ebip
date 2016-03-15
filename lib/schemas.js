InstitutionSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'institution unique name'
    },
    officials: {
        type: Object,
        optional: true,
        label: 'officials of institution (presitents, ministers etc.)'
    },
    sideMenus: {
        type: [Object],
        label: 'menus with article categories',
        defaultValue: []
    },
    'sideMenus.$.header': {
        type: String,
        label: 'category header'
    },
    'sideMenus.$.filters': {
        type: [Object],
        label: 'filters of articles'
    },
    'sideMenus.$.filters.$.title': {
        type: String,
        label: 'title of filter'
    },
    'sideMenus.$.filters.$.tags': {
        type: [String],
        label: 'array of tags using for filtering'
    },
    logo: {
        type: String,
        label: 'institution logo encoded as string',
        optional: true
    }
    /*
    sideMenus: [{
        header: String,
        filters: [{
            title: String,
            tags: String
        }]
    }]
    */
});
ArticleSchema = new SimpleSchema({
    title: {
        type: String,
        label: 'article\'s title'
    },
    content: {
        type: String,
        label: 'article\'s content'
    },
    tags: {
        type: [String],
        label: 'RDF tags',
        defaultValue: []
    },
    institution_id: {
        type: String
    },
    author: {
        type: String,
        label: 'author (should be a title of any institution\'s official)',
        optional: true
    },
    publicationDate: {
        type: Number,
        label: 'publication date (after this date article is publically visible)',
        defaultValue: Infinity
    },
    expirationDate: {
        type: Number,
        label: 'expiration date (after this date article is hidden)',
        defaultValue: Infinity
    },
    /*status: {
        type: String,
        allowedValues: ['draft', 'published', 'expired']
    }*/
});
