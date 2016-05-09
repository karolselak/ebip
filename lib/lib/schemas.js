InstitutionSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'institution unique name'
    },
    email: {
        type: String,
        optional: true,
        label: 'email address'
    },
    logo: {
        type: String,
        label: 'institution logo encoded as string',
        optional: true
    },
    numberOfEmployees: {
        type: Number,
        label: 'the number of employees in the institution',
        optional: true
    },
    telephone: {
        type: Number,
        label: 'the telephone number',
        optional: true
    },
    address: {
        type: Object,
        optional: true,
        //rdfExpectedTypes: [''],
        label: '[https://schema.org/PostalAddress] physical address of the institution'
    },
    'address.streetAddress': {
        type: String,
        optional: true,
        label: 'street and house number'
    },
    'address.addressLocality': {
        type: String,
        optional: true,
        label: 'town name'
    },
    'address.postalCode': {
        type: String,
        optional: true,
        label: 'postal code'
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
    attachment_id: {
        type: String,
        optional: true
    }
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
        label: 'array of urls defining types the type inherits from',
        defaultValue: []
    },
    sameAs: {
        type: String,
        label: 'url defining types the type is same as'
    },
    properties: {
        type: [String],
        label: 'array with names of properties defined as propertyTypes',
        defaultValue: []
    }
});
PropertyTypeSchema = new SimpleSchema({
    name: {
        type: String
    },
    description: {
        type: String,
        label: 'short description of the type',
        optional: true
    },
    sameAs: {
        type: String,
        label: 'url defining types the property is same as',
        optional: true
    },
    expectedTypes: {
        type: [String],
        label: 'array of urls defining types allowed for the property'
    }
});
