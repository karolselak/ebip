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
            <div className="container" id="homepage">
              <div className="row" id="button-addInstitutions">
                <button type="button" className="btn btn-info" data-toggle="modal" data-target="#addInstitutionModal">Dodaj instytucję</button>

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
                        <input type="text"></input>
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
              {this.renderInstitutions()}
          </div>
        </div>
        </div>
    },
    renderInstitutions() {
        return this.data.institutions.map(function(el){
            return <div>
                <a href={'/'+el.name}>{el.name}</a>
                <button type="button" className="btn btn-danger"
                onClick={this.removeInstitution}>
                    Usuń instytucję {el.name}
                </button>
            </div>
        })
    },
    addInstitution(event) {
        var name = $(event.target).closest('.modal-content').find('input')[0];
        Meteor.call('addInstitution', {
            name: name.value
        })
    },
    //IN PROGRESS
    removeInstitution(event) {
        var insName = $(event.target).innerHTML().split(" ");
        insName=insName[insName.length];
        Meteor.call('removeInstitution', {
            name: insName
        })
    }
});
