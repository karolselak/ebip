Permissions = React.createClass({
    getInitialState: function() {
      return {HandleUser: ""};
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            user: Meteor.users.find().fetch(),
            institutions: Institutions.find().fetch()
        };
    },

    render() {
        return  <div className='container' id='globalSearch'>
                <div className='col-md-12'>

                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <td><p>Urzytkownik</p><td><p>Posiadane uprawnienia</p></td></td> <td>  </td> <td> </td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.insertRow()}
                        </tbody>
                    </table>

                    {/*okno nadawania uprawnien lokalnych: */}
                    <div className="modal fade" id="addLocalRights" role="dialog">
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
                                    {this.checked()}
                                </tbody>
                            </table>
                            <div className="modal-footer">
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

                    {/*okno nadawania uprawnien globalnych */}
                    <div className="modal fade" id="addGlobalRight" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Czy chcesz nadach urzytkownikowi {this.state.HandleUser} uprawnienia globalne?</h4>
                            </div >
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={this.saveGlobalRights} data-dismiss="modal">
                                    TAK
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

    whatRights: function(value){
      var Right
      if(value.GlobalRight){
        Right="Globalne";
      }else if(value.institutions) {
        Right="Lokalne:"+value.institutions.length;
      }else{
        Right="Brak";
      }
      return <td>{Right}</td>
    },

    insertRow(){
        return this.data.user.map((el)=>{
            return <tr >
                <td><p>{el.username}</p></td>
                {this.whatRights(el)}
                <td>
                <button type="button" id={el.username} onClick={this.handleClick.bind(this,el.username)} className="btn btn-info" data-toggle="modal" data-target="#addLocalRights">
                    Dodaj Uprawnienia Lokalne
                </button>
                </td>
                <td>
                <button type="button" id={el.username} onClick={this.handleClick.bind(this,el.username)} className="btn btn-info" data-toggle="modal" data-target="#addGlobalRight">
                    Dodaj uprawnienia Globalne
                </button>
                </td>
            </tr>
        })
    },

    checked(){
      var us;
      for(var i=0;i<this.data.user.length;i++){
        if(this.data.user[i].username === this.state.HandleUser) {
          us=this.data.user[i];
          break;
        }
      }
      if(us){
        if(us.institutions && us.GlobalRight===false){
          for(var j=0;j<this.data.institutions.length;j++){
            if(us.institutions.indexOf(this.data.institutions[j]._id)!=-1){
              document.getElementById(this.data.institutions[j]._id).checked = true;
            }else{
              document.getElementById(this.data.institutions[j]._id).checked = false;
            }
          }
        }else if(us.GlobalRight===true){
          for(var j=0;j<this.data.institutions.length;j++){
            document.getElementById(this.data.institutions[j]._id).checked = true;
          }
        }else{
          for(var j=0;j<this.data.institutions.length;j++){
            document.getElementById(this.data.institutions[j]._id).checked = false;
          }
        }

      }
    },

    insertInstisutions(){
        return this.data.institutions.map((el)=>{
            return <tr>
            <td> <p>{el.name}</p></td>
            return <td><input type="checkbox" id={el._id} /></td>
            </tr>
        })
    },

    saveGlobalRights(){
        Meteor.call('addGlobalAdminRights',this.state.HandleUser)
    },

    saveRights(){
        var ins=[];
        this.data.institutions.map((el)=>{
            if (document.getElementById(el._id).checked) {
                ins.push(el._id);
            }
        })
        Meteor.call('addAdminRights',this.state.HandleUser,ins)
    }

});
