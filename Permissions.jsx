Permissions = React.createClass({
    getInitialState: function() {
    
    return {HandleUser: ""};
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var us= Meteor.users.find().fetch();
        return {
            user: us,
            institutions: Institutions.find().fetch()
        };
    },
    render() {
        return  <div className='container' id='globalSearch'>
                <div className='col-md-12'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <td><p>Urzytkownik</p></td> <td>  </td>    
                            </tr>
                        </thead>
                        <tbody>
                            {this.insertRow()}
                        </tbody>
                    </table>
                    {/*okno nadawania uprawnien: */}
                    <div className="modal fade" id="addPermissions" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Dodaj uprawnienia urzytkownikowi: {this.state.HandleUser}</h4>
                            </div >

                            <table className='table table-hover' >
                                <thead>
                                    <tr>
                                        <td><p>Instytucja</p></td> <td>  </td>    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.insertInstisutions()}
                                    
                                </tbody>
                            </table>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={this.saveGlobalRights} data-dismiss="modal">
                                    Uprawnienia globalne
                                </button>
                                <button type="button" className="btn btn-success" onClick={this.saveRights} data-dismiss="modal">
                                    Zapisz
                                </button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">
                                    Anuluj
                                </button>
                            </div>
                        </div>
                    </div>
                    </div> 
                </div>
        </div>
    },
    handleClick: function(value) {  
       this.setState({HandleUser:value});
    },
    insertRow(){
        return this.data.user.map((el)=>{ 
            return <tr >
                <td><p>{el.username}</p></td> 
                <td>
                <button type="button" id={el.username} onClick={this.handleClick.bind(this,el.username)} className="btn btn-info" data-toggle="modal" data-target="#addPermissions">
                    Dodaj Uprawnienia
                </button>
                </td>   
            </tr>
        })
    },
    insertInstisutions(){
        return this.data.institutions.map((el)=>{ 
            return <tr>
            <td> <p>{el.name}</p></td>
            <td><input type="checkbox" id={el.name}/></td>
            </tr>
        })
    }, 
    checked(){
        return this.data.institutions.map((el)=>{ 
            var us=null; 
            var check=null;
            us=this.data.user.findOne({username: this.HandleUser});
            if(us!=null){
                checked=us.findOne({institutions: el});
            }
           if (checked!=null){
                document.getElementById(el.name).value=true;
            }
        })
    },
    saveGlobalRights(){
        Meteor.call('addGlobalAdminRights',this.state.HandleUser)
    },
    saveRights(){
        var ins=[];
        this.data.institutions.map((el)=>{ 
            if (document.getElementById(el.name).checked) {
                ins.push(el._id);
            }
        })
        Meteor.call('addAdminRights',this.state.HandleUser,ins)
    }
});