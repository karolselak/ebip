InstitutionSchema = new SimpleSchema({
    name: {
        type: String,
        label: '[RDF] institution unique name'
    },
    email: {
        type: String,
        optional: true,
        label: '[RDF] email address'
    },
    logo: {
        type: String,
        label: '[RDF] institution logo encoded as string',
        optional: true
    },
    numberOfEmployees: {
        type: Number,
        label: '[RDF] the number of employees in the institution',
        optional: true
    },
    telephone: {
        type: Number,
        label: '[RDF] the telephone number',
        optional: true
    },
    address: {
        type: Object,
        optional: true,
        label: '[RDF] physical address of the institution'
    },
    'address.streetAddress': {
        type: String,
        optional: true,
        label: '[RDF] street and house number'
    },
    'address.addressLocality': {
        type: String,
        optional: true,
        label: '[RDF] town name'
    },
    'address.postalCode': {
        type: String,
        optional: true,
        label: '[RDF] postal code'
    },
    officials: {
        type: Object,
        optional: true,
        label: 'officials of institution (presitents, ministers etc.)'
    },
    //menu boczne:
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
ItemTypeSchema = new SimpleSchema({
    name: {
        type: String
    },
    description: {
        type: String,
        label: 'short description of the type',
        optional: true
    },
    inheritsFrom: {
        type: [String],
        label: 'array of urls defining types the property inherits from',
        defaultValue: []
    },
    properties: {
        type: [Object],
        defaultValue: []
    },
    'properties.$.name': {
        type: String
    },
    'properties.$.expectedTypes': {
        type: [String],
        label: 'array of urls defining types allowed for the property'
    },
    'properties.$.description': {
        type: String,
        optional: true,
        label: 'short description of the property'
    }
});

