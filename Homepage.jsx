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
        return <div>
            <div className="container">
                <div className="row">
                  {/*text input: */}
                  <div className="col-md-7 col-md-offset-3 well">
                    <table>
                        <tr>
                            <td id="search-box">
                                <div className="form-group">
                                    <input type="text" className="form-control" id="searchValue"/>
                                </div>
                            </td>
                            <td>

                            <div className="dropdown" id='author'>
                                <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Wybierz instytucje
                                <span className="caret"></span></button>
                                <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                                    {this.renderInsToSrlrect()}
                                </ul>
                            </div>
                            </td>
                            <td>
                                <button type="button" className="btn btn-infol"  id="btn-info1" onClick={this.gotoSerchResults} >
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
                    <i data-toggle="modal" data-target="#addInstitutionModal">
                      <div id="addInstitutiontile">
                        <span className="glyphicon glyphicon-plus-sign"></span>
                      </div>
                    </i>
                  </div>
                {/*okno dodawania instytucji: */}
                <div className="modal fade" id="addInstitutionModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">/search/ala
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
    renderInsToSrlrect(){
      return this.data.institutions.map((el)=>{
          return <li role="presentation"><a role="menuitem" href="#">{el.name}</a></li>
        });

    },
    renderInstitutions() {
        return this.data.institutions.map((el)=>{
<<<<<<< HEAD
            return <div id={el._id}>
                <button type="button" className="btn btn-xs btn-default" onClick={this.removeInstitution}>
                    <span className="glyphicon glyphicon-trash"
                        aria-label="Usuń"></span>
                </button>
                <a href={'/i/'+el.name}> {el.name}</a>
            </div>
=======
            return <div className= "tile1" >
                    <a className="tilelink" href={'/i/'+el.name}> {el.name}
                    </a>
                    <div className="bottomRowInst" id={el._id}>
                      <button type="button" className="btn btn-xs btn-default "
                      onClick={this.removeInstitution}>
                          <span className="glyphicon glyphicon-trash"
                              aria-label="Usuń"></span>
                      </button>
                    </div>
                  </div>
>>>>>>> 28cb99c14c1f057ff14fbc522abbadf38b8f4e69
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
    },
    gotoSerchResults(){
        var temp=document.getElementById("searchValue").value
        if(temp!=""){
            document.location="/search/"+temp
        }
    }
});
