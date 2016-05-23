Homepage = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            institutions: Institutions.find().fetch()
        };
    },
    render()
    {
        _homepage_ = this;
        //TODO Hubert: niech to zacznie wyglądać po ludzku, bez tych brzydkich zaokrągleń, wyszukiwarka jako input
        return <div className="container">
                  <div className="col-md-12" id="hompeCont">
                    {this.renderInstitutions()}
                    {this.addInstButton()}
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
    },
    renderInstitutions() {
      if ( Meteor.user()) {
        if (Meteor.user().GlobalRight===true) {
          return this.data.institutions.map((el)=>{
              return <div className= "tile1" >
                  <a className="tilelink" href={'/i/'+el.name}> {el.name}
                  </a>
                  <div className="bottomRowInst" id={el._id}>
                    <button type="button" id={'buttonRemuve'+el._id} className="btn btn-xs btn-default "
                    onClick={this.removeInstitution}>
                        <span className="glyphicon glyphicon-trash" aria-label="Usuń">
                        </span>
                    </button>
                  </div>
              </div>
          })
        }else{
          return this.data.institutions.map((el)=>{
              return <div className= "tile1" >
                  <a className="tilelink2" href={'/i/'+el.name}> {el.name}
                  </a>
              </div>
          })
        }
      }else{
        return this.data.institutions.map((el)=>{
            return <div className= "tile1" >
                <a className="tilelink2" href={'/i/'+el.name}> {el.name}
                </a>
            </div>
        })
      }
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
        if(confirm("Czy na pewno usunąć instytucję?")) {
            Meteor.call('removeInstitution', $(event.target).closest('div')[0].id);
        }
    },
    addInstButton(){
      if ( Meteor.user()) {
        if (Meteor.user().GlobalRight===true) {
          return <i data-toggle="modal" data-target="#addInstitutionModal">
            <div id="addInstitutionTile">
              <span className="glyphicon glyphicon-plus-sign"></span>
            </div>
          </i>
        }
      }
    }
});
