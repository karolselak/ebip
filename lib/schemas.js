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
