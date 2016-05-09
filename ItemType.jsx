ItemType = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var itemtype = ItemTypes.findOne({name: this.props.itemname});
        var propertytype;        
        if (!itemtype) {
            propertytype = PropertyTypes.findOne({name: this.props.itemname});
        }
        return {
            itemtype: itemtype,
            propertytype: propertytype
        };
    },
    render() {
        if (this.data.itemtype) {
            return <div className='container'>
                {/*nagłówek z nazwą typu: */}
                <h2>{this.data.itemtype.name}</h2>
                <div><b>{this.data.itemtype.description}</b></div>
                {this.renderParents()}
                {this.renderSameAs()}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Spodziewany typ</th>
                            <th>Opis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProperties()}
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-md-12">
                        <button type="button" className="btn btn-info" data-toggle="modal" data-target="#addPropertyModal">
                            Dodaj właściwość
                        </button>
                    </div>
                </div>
                {/*okno dodawania właściwości: */}
                <div className="modal fade" id="addPropertyModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Dodaj właściwość</h4>
                        </div>
                    <div className="modal-body">
                        <div>Nazwa:</div>
                        <input type="text" id='name' className='form-control'/>
                        <div>Spodziewany typ:</div>
                        <textarea id='expectedTypes' className='form-control' rows='3' cols='80' >https://schema.org/Text</textarea>
                        <div>Opis:</div>
                        <textarea id='description' className='form-control' rows='3' cols='80'></textarea>                       
                    </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success"
                            data-dismiss="modal" onClick={this.addProperty}>
                                Dodaj
                            </button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Anuluj</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        } else if (this.data.propetytype) {
            return <div className='container'>
                {/*nagłówek z nazwą typu: */}
                <h2>{this.data.itemtype.name}</h2>
                <div><b>{this.data.itemtype.description}</b></div>
                {this.renderParents()}
                {this.renderSameAs()}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Spodziewany typ</th>
                            <th>Opis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProperties()}
                    </tbody>
                </table>              
            </div>
        } else {
            return null;
        }
    },
    addProperty(event) {
        var $modal = $(event.target).closest('.modal-content');
        Meteor.call('addItemTypeProperty', this.data.itemtype._id, {
            name: $modal.find('#name')[0].value,
            expectedTypes: $modal.find('#expectedTypes')[0].value.split(',').map((el)=>{return el.trim()}),
            description: $modal.find('#description')[0].value
        })    
    },
    renderProperties() {
        return this.data.itemtype.properties.map((el, i)=>{
            return <tr>
                <td>
                    <button type="button" id={i} className="btn btn-xs btn-default"
                    onClick={this.removeProperty}>
                        <span className="glyphicon glyphicon-trash"
                            aria-label="Usuń"></span>
                    </button> {el.name}
                </td>
                <td>{this.renderExpectedTypes(el.expectedTypes)}</td>
                <td>{el.description}</td> 
            </tr>
        })
    },
    renderExpectedTypes(arr) {
        return arr.map((el, i)=>{
            if (el) {
                var splitString = el.split('/');
                var name = splitString[splitString.length-1];
                if (i < arr.length-1) {
                    return <span><a href={el}>{name}</a> lub </span>
                } else {
                    return <span><a href={el}>{name}</a></span>            
                } 
            } else {
                return null;            
            }
        })
    },
    renderParents() {
        if (this.data.itemtype.inheritsFrom && this.data.itemtype.inheritsFrom.length > 0) {
            var arr = this.data.itemtype.inheritsFrom;
            return <div>Dziedziczy po: {arr.map((el, i)=>{
                if (i < arr.length-1) {
                    return <span><a href={'/directory/'+el}>{el}</a>, </span>
                } else {
                    return <span><a href={'/directory/'+el}>{el}</a></span>            
                }
            })}</div>
        }
    },
    renderSameAs() {
        if (this.data.itemtype.sameAs && this.data.itemtype.sameAs.length > 0) {
            var arr = this.data.itemtype.sameAs;
            return <div>Identyczny z: {arr.map((el, i)=>{
                var splitString = el.split('/');
                var name = splitString[splitString.length-1];
                if (i < arr.length-1) {
                    return <span><a href={el}>{name}</a>, </span>
                } else {
                    return <span><a href={el}>{name}</a></span>            
                } 
            })}</div>
        }
    },
    removeProperty(event) {
        Meteor.call('removeItemTypeProperty', this.data.itemtype._id, event.target.id)    
    }
});
