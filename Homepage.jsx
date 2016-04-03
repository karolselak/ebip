Homepage = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            institutions: Institutions.find().fetch()
        };
    },
    render()
    {
        //TODO Hubert: niech to zacznie wyglądać po ludzku, bez tych brzydkich zaokrągleń, wyszukiwarka jako input
        //TODO Kaj: usuwanie instytucji (przycisk + funkcja + metoda w methods.js)
        return <div>
            <div className="container">
                <div className="row">
                  {/*text input: */}
                  <div className="col-md-7 col-md-offset-3">
                    <table>
                        <tr>
                            <td id="search-box">
                                <div className="form-group">
                                    <input type="text" className="form-control"/>
                                </div>
                            </td>
                            <td>
                                <button type="button" className="btn btn-info" id="btn-info1">
                                    <span className="glyphicon glyphicon-search">Wyszukaj</span>
                                </button>
                            </td>
                        </tr>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-11">
                    {this.renderInstitutions()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div id="bottom-button-add-institution">
                      <button type="button" className="btn btn-info" data-toggle="modal" data-target="#addInstitutionModal">Dodaj instytucję</button>
                    </div>
                  </div>
                {/*okno dodawania instytucji: */}
                <div className="modal fade" id="addInstitutionModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Dodaj instytucję</h4>
                        </div>
                    <div className="modal-body">
                        <div>Nazwa instytucji:</div>
                        <input type="text" id='name' className='form-control'/>
                        <div>Budynek i ulica:</div>
                        <input type="text" id='streetAddress' className='form-control'/>
                        <div>Miasto:</div>
                        <input type="text" id='addressLocality' className='form-control'/>
                        <div>Kod pocztowy:</div>
                        <input type="text" id='postalCode' className='form-control'/>
                        <div>Adres email:</div>
                        <input type="text" id='email' className='form-control'/>
                        <div>Numer telefonu:</div>
                        <input type="text" id='telephone' className='form-control'/>
                        <div>Liczba pracowników:</div>
                        <input type="text" id='numberOfEmployees' className='form-control'/>
                    </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success"
                            data-dismiss="modal" onClick={this.addInstitution}>
                                Dodaj
                            </button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Anuluj</button>
                        </div>
                    </div>
                </div>
                </div>
              </div>
        </div>
        </div>
    },
    renderInstitutions() {
        return this.data.institutions.map((el)=>{
            return <div id={el._id}>
                <button type="button" className="btn btn-default"
                onClick={this.removeInstitution}>
                    <span className="glyphicon glyphicon-trash"
                        aria-label="Usuń"></span>
                </button>
                <a href={'/i/'+el.name}> {el.name}</a>
            </div>
        })
    },
    addInstitution(event) {
        var $modal = $(event.target).closest('.modal-content');
        Meteor.call('addInstitution', {
            name: $modal.find('#name')[0].value,
            address: {
                streetAddress: $modal.find('#streetAddress')[0].value,
                addressLocality: $modal.find('#addressLocality')[0].value,
                postalCode: $modal.find('#postalCode')[0].value,
            },
            email: $modal.find('#email')[0].value,
            telephone: $modal.find('#telephone')[0].value,
            numberOfEmployees: $modal.find('#numberOfEmployees')[0].value,
        })
    },
    removeInstitution(event) {
        Meteor.call('removeInstitution', $(event.target).closest('div')[0].id)
    }
});
