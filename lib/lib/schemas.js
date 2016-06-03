AddressSchema = new SimpleSchema({
    streetAddress: {
        type: String,
        optional: true,
        label: '[http://schema.org/streetAddress] street and house number'
    },
    addressLocality: {
        type: String,
        optional: true,
        label: '[http://schema.org/addressLocality] town name'
    },
    postalCode: {
        type: String,
        optional: true,
        label: '[http://schema.org/postalCode] postal code'
    }
});
InstitutionSchema = new SimpleSchema({
    name: {
        type: String
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
        type: String,
        label: 'the telephone number',
        optional: true
    },
    address: {
        type: AddressSchema,
        optional: true,
        //rdfExpectedTypes: [''],
        label: '[https://schema.org/PostalAddress] physical address'
    },
    type: {
        type: String,
        label: 'RDF type',
        optional: true
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
    },    type: {
        type: String,
        label: 'RDF type',
        optional: true
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
        label: 'tags',
        defaultValue: []
    },
    institution_id: {
        type: String
    },
    type: {
        type: String,
        label: 'RDF type',
        optional: true
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
});
PersonSchema = new SimpleSchema({
    pesel: {
        type: String,
        label: 'personal number of Polish citizen'
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    officialTitle: {
        type: String,
        label: 'official title (e.g. academic, military)',
        optional: true
    },
    email: {
        type: String,
        optional: true
    },
    telephone: {
        type: String,
        optional: true
    },
    address: {
        type: AddressSchema,
        optional: true,
        label: '[https://schema.org/PostalAddress] physical address'
    },
    birthDate: {
        type: Number,
        optional: true
    }
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
        label: 'url defining types the type is same as',
        optional: true
    },
    properties: {
        type: [String],
        label: 'properties defined as propertyTypes',
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
