Directory = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            itemtypes: ItemTypes.find().fetch()
        };
    },
    getInitialState() {
        return {
            selectedParent: ''
        }
    },
    render() {
        return <div className='container'>
            <div className="row">
              <div className="col-md-11">
                {this.renderList()}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                  <button type="button" className="btn btn-info" data-toggle="modal" data-target="#addTypeModal">Dodaj typ</button>
              </div>
            </div>
            {/*okno dodawania typu: */}
            <div className="modal fade" id="addTypeModal" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Dodaj typ</h4>
                    </div>
                <div className="modal-body">
                    <div>
                        <div>Nazwa:</div>
                        <input type="text" id='name' className='form-control'/>
                    </div>
                    <div>
                        <div>Opis:</div>
                        <textarea id='description' className='form-control' rows='3' cols='80'></textarea>
                    </div>
                    <div>                        
                        <div>Rodzic:</div>
                        <br/>
                        <div className="dropdown" id='author'>
                            <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">{this.renderSelectedParent()} <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                {this.renderDropdownTypes()}
                            </ul>
                        </div>
                        <br/>
                    </div>
                    <div>
                        <div>Identyczny z:</div>
                        <input type="text" id='sameAs' className='form-control'/>        
                    </div>    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success"
                    data-dismiss="modal" onClick={this.addItemType}>
                        Dodaj
                    </button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Anuluj</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    },
    renderSelectedParent() {
        if (!this.state.selectedParent) {
            return <span>brak rodzica</span>;        
        } else {
            return <span>{this.state.selectedParent}</span>;
        }
    },
    renderDropdownTypes() {
        var arr = this.data.itemtypes.map((el)=>{return el.name})
        arr.push('');
        for (var i in arr) {
            if (arr[i] == this.state.selectedParent) {
                arr.splice(i,1);
            }
        }
        return arr.map((el)=>{
            return <li onClick={this.selectParent}><a href='#' id={el}>{el || ' - brak rodzica - '}</a></li>;
        });
    },
    selectParent(event) {
        this.setState({selectedParent: event.target.id})
    },
    renderList() {
        return this.data.itemtypes.map((el)=>{
            return <div id={el._id}>
                <a href={'/directory/'+el.name}> {el.name}</a>
            </div>
        })
    },
    addItemType(event) {
        var $modal = $(event.target).closest('.modal-content');
        var sameAsStr = $modal.find('#sameAs')[0].value;
        Meteor.call('addItemType', {
            name: $modal.find('#name')[0].value,
            description: $modal.find('#description')[0].value,
            inheritsFrom: this.state.selectedParent ? [this.state.selectedParent] : [],
            sameAs: sameAsStr ? sameAsStr.split(',').map(function(el){return el.trim()}) : [],
        })
    },
});
