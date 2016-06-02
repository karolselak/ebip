ItemType = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var itemtype = ItemTypes.findOne({name: this.props.itemname});
        var propertytype;        
        if (!itemtype) {
            propertytype = PropertyTypes.findOne({name: this.props.itemname});
        } else {
            itemtype.properties = itemtype.properties.map((name, i)=>{
                return PropertyTypes.findOne({name: name});
            });
            var extendItemType2 = function(type) {
                for (var i in type.inheritsFrom) {
                    var parent = ItemTypes.findOne({name: type.inheritsFrom[i]});
                    parent.properties = parent.properties.map((name, i)=>{
                        return PropertyTypes.findOne({name: name});
                    });
                    extendItemType2(parent);
                    type.inheritedProperties = [{from: parent.name, properties: parent.properties}];
                    if (parent.inheritedProperties) {
                        type.inheritedProperties = type.inheritedProperties.concat(parent.inheritedProperties);
                    }
                }
            }
            extendItemType2(itemtype);
        }
        return {
            itemtype: itemtype,
            propertytype: propertytype,
            user: Meteor.user()
        };
    },
    render() {
        if (this.data.itemtype) {
            return <div className='container'>
                {/*nagłówek z nazwą typu: */}
                <h2>{this.data.itemtype.name}</h2>
                <div><b>{this.data.itemtype.description}</b></div>
                {this.renderParents()}
                {this.renderSameAs(this.data.itemtype.sameAs)}
                {this.data.user && this.data.user.GlobalRight ? <div className="row">
                    <div className="col-md-12">
                        <button type="button" className="btn btn-info" data-toggle="modal" data-target="#addPropertyModal">
                            Dodaj właściwość
                        </button>
                    </div>
                </div> : null}               
                <table className='table'>
                    <thead>
                        <tr className='info'>
                            <th>Nazwa</th>
                            <th>Spodziewany typ</th>
                            <th>Opis</th>
                        </tr>
                    </thead>
                    {this.renderProperties()}
                </table>
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
                        <div>Identyczny z:</div>
                        <input type="text" id='sameAs' className='form-control'/>
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
        } else if (this.data.propertytype){
            return <div className='container'>
                {/*nagłówek z nazwą typu: */}
                <h2>{this.data.propertytype.name}</h2>
                <div>{this.renderSameAs(this.data.propertytype.sameAs)}</div>
                <div><b>{this.data.propertytype.description}</b></div>
                Spodziewany typ: {this.renderExpectedTypes(this.data.propertytype.expectedTypes)}
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
            description: $modal.find('#description')[0].value,
            sameAs: $modal.find('#sameAs')[0].value
        })    
    },
    renderProperties() {
        var render = (props, ifBin)=>{
            return props.map((el, i)=>{
                //var el = PropertyTypes.findOne({name: name});
                return <tr>
                    <td>
                        {ifBin ? <button type="button" id={i} className="btn btn-xs btn-default"
                        onClick={this.removeProperty}>
                            <span className="glyphicon glyphicon-trash"
                                aria-label="Usuń"></span>
                        </button> : null} <a href={'/dictionary/'+el.name}>{el.name}</a>
                    </td>
                    <td>{this.renderExpectedTypes(el.expectedTypes)}</td>
                    <td>{el.description}</td> 
                </tr>
            })
        }
        var arr = [];
        arr.push(<thead><tr className='active'><td colSpan='3'>
            <b>Właściwości z <a href={'/dictionary/'+this.data.itemtype.name}>{this.data.itemtype.name}:</a></b>
        </td></tr></thead>);
        arr = arr.concat(<tbody>{render(this.data.itemtype.properties, this.data.user && this.data.user.GlobalRight)}</tbody>);        
        var p = this.data.itemtype.inheritedProperties;
        for (var i in p) {
            arr.push(<thead><tr className='active'><th colSpan='3'>
                <b>Właściwości z <a href={'/dictionary/'+p[i].from}>{p[i].from}:</a></b>
            </th></tr></thead>)
            arr = arr.concat(<tbody>{render(p[i].properties)}</tbody>);
        }
        return arr;
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
                    return <span><a href={'/dictionary/'+el}>{el}</a>, </span>
                } else {
                    return <span><a href={'/dictionary/'+el}>{el}</a></span>            
                } 
            })}</div>
        }
    },
    renderSameAs(el) {
        /*if (this.data.itemtype.sameAs && this.data.itemtype.sameAs.length > 0) {
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
        }*/
        if (el) {
            var splitString = el.split('/');
            var name = splitString[splitString.length-1];
            return <span>Identyczny z: <a href={el}>{name}</a></span>;
        }
    },
    removeProperty(event) {
        Meteor.call('removeItemTypeProperty', this.data.itemtype._id, event.currentTarget.id)    
    }
});
