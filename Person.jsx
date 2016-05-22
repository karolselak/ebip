Person = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            person: Persons.find({pesel: this.props.pesel}).fetch()
        };
    },
    render() {
        var p = this.data.person;
        return <section itemScope itemType={rdfContext+'Person'}>
            <h2>{p.officialTitle ? <span itemProp='officialTitle'>{p.officialTitle} </span> : ''}<span itemProp='name'>{p.name}</span> <span itemProp='surname'>{p.surname}</span></h2>
            <div>
                <b>Email:</b> <span itemProp='email'>{p.email}</span>
            </div>
            <div>
                <b>Telefon:</b> <span itemProp='telephone'>{p.telephone}</span>
            </div>
            <div>
                <b>Adres:</b><br/>
                <span itemProp='name'>{this.data.institution.name}</span><br/>
                <section itemProp='address' itemScope itemType={rdfContext+'PostalAddress'}>
                    <span itemProp='streetAddress'>{p.address.streetAddress}</span><br/>
                    <span itemProp='postalCode'>{p.address.postalCode} </span>
                    <span itemProp='addressLocality'>{p.address.addressLocality}</span>
                </section>
            </div>
            <div>
                <b>Data urodzin: </b>
                <span itemProp='birthDate'>{(new Date(p.birthDate)).toLocaleDateString()}</span>
            </div>
            <div>
                <b>PESEL: </b>
                <span itemProp='pesel'>{p.pesel}</span>
            </div>
        </section>
    }
});
