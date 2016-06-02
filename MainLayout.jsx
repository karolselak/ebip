MainLayout = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            institutions: Institutions.find().fetch()
        };
    },
    getInitialState() {
        return {
            selectedInst: '',
        }
    },
    render() {
        return (
        <main>
        <body>
            <div className="container bodystyle">
                <header className="row">
                  <div className="col-md-9 ">
                    <a id="projectTitleLink" href="/">
                      <h2><p id="projectTitle">Projekt eBIP</p></h2>
                    </a>
                  </div>
                  <div className="col-md-3 ">
                    <div className="row">
                      {this.headerMenu()}

                    </div>
                  </div>
                </header>

                <div className="row">
                    <div className="col-md-4 col-md-offset-2 instSearch" >
                        <input type="text" className="form-control searchControl" id="searchValue"/>
                    </div>
                    <div className="col-md-2 dropdown instSearch" >
                        <button className='btn btn-default dropdown-toggle searchControl' type='button' id='menu1' data-toggle='dropdown'>{this.renderSelectedInst()}
                        &nbsp;<span className="caret"></span></button>
                        <ul className='dropdown-menu'>
                          <li onClick={this.selectInst} ><a id="Wszystkie">Wszystkie</a></li>
                            {this.renderSearchDropdown()}
                        </ul>
                    </div>
                    <div className="col-md-2 instSearch">
                        <button type="button " className="btn btn-infol searchControl"  onClick={this.gotoSerchResults} >
                            <span className="glyphicon glyphicon-search"></span> Wyszukaj
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12" id="hompeCont">
                      {this.props.content}

                  </div>
                </div>

                <footer className="row">
                  <div className="col-md-12">
                    <h5 id="footerText">
                        <p className ="text-center">Projekt zrealizowany przez studentów Politechniki Wrocławskiej</p>
                        <p className="text-center">Wrocław 2016</p>
                    </h5>
                  </div>
                </footer>
            </div>
        </body>
        </main>);
    },
    renderSearchDropdown(){
      return this.data.institutions.map((el)=>{
          return <li onClick={this.selectInst} ><a id={el.name}>{el.name}</a></li>
        });

    },
    gotoSerchResults(){
        var szukana=document.getElementById("searchValue").value
        if(szukana){
          if(this.state.selectedInst){
            document.location="i/"+this.state.selectedInst+"/search/"+szukana
          }else{
            document.location="/search/"+szukana
          }

        }
    },
    renderSelectedInst() {
        if (!this.state.selectedInst) {
            return <span>Wybierz instytucję</span>;
        } else {
            return <span>{this.state.selectedInst}</span>;
        }
    },
    selectInst(event) {
        this.setState({selectedInst: event.target.id});
    },
    headerMenu() {
        var accountUI = Accounts.userId() ? this.logoutModal() : this.loginModal();
        var nazwa = Accounts.user();
        nazwa = nazwa != null ? nazwa.username : "Account";
        return <div>
            <div className="col-md-3 tileMenu">
                <a className="menuLink" href="/dictionary/" id="dictionaryLink">
                <div className="menuIcon glyphicon glyphicon-book" ></div><div>Słownik</div>
                </a>
              </div>
            {
                Meteor.user() && Meteor.user().GlobalRight ? <div className="col-md-5 tileMenu">
                    <a className="menuLink" href={'/permissions'}>
                    <div className="menuIcon glyphicon glyphicon-cog" ></div><div>Administratorzy</div>
                    </a>
                </div> : null
            }
          <div className="col-md-4 tileMenu">
            <div className=" menuIcon glyphicon glyphicon-user"></div>
            <AccountsUIWrapper />
          </div>
          <div className="col-md-4 tileMenu">
            <div className=" menuIcon glyphicon glyphicon-user"></div>
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal"
                data-target="#accountModal">{nazwa}</button>
          </div>
          {accountUI}
        </div>
    },
    loginModal() {
        var show_login = function(event) {
            var $modal = $(event.target).closest('.modal-body');
            $modal.find("#sign_up").show();
            $modal.find("#sign_in").hide();
        };
        var login = function(event) {
            var $modal = $(event.target).closest('.modal-body');
            var credentials = $modal.find("#sign_in")
            var username = credentials.find('#username')[0].value;
            var password = credentials.find('#password')[0].value;
            Meteor.loginWithPassword(username, password);
            console.log(Meteor.loggingIn());
            //window.location.reload();
        };
        var sign_up = function(event) {
            var $modal = $(event.target).closest('.modal-body');
            var credentials = $modal.find("#sign_up")
            //console.log(credentials);
            var username = credentials.find('#username')[0].value;
            var password = credentials.find('#password')[0].value;
            var password_confirm = credentials.find('#password_confirm')[0].value;
            //console.log(password);
            //console.log(password_confirm);
            if (password_confirm == password) {
                var data = {
                    username : username,
                    password : password
                };
                console.log(data);
                Accounts.createUser(data);
                //while (Meteor.loggingIn()) {

                //}
                //window.location.reload();
            }
        };
        return <div id="accountModal" className="modal fade" role="dialog">
  <div className="modal-dialog">

    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Login</h4>
      </div>
      <div className="modal-body">
          <div id="sign_in">
              <label htmlFor="username">Nazwa użytkownika</label>
              <input id='username' className='form-control' type='text' />
              <label htmlFor="password">Hasło</label>
              <input id='password' className='form-control' type='password' />
                  <button type="button" className="btn btn-primary" onClick={login}
                      data-dismiss="modal">
                      Zaloguj
                  </button>
                  <button className="btn btn-primary" onClick={show_login}>Stwórz nowe konto</button>
          </div>
          <div id="sign_up" style={{display: "none"}}>
              <label htmlFor="username">Nazwa użytkownika</label>
              <input id='username' className='form-control' type='text' />
              <label htmlFor="password">Hasło</label>
              <input id='password' className='form-control' type='password' />
              <label htmlFor="password_confirm">Powtórz hasło</label>
              <input id='password_confirm' className='form-control' type='password' />
                  <button type="button" className="btn btn-primary" onClick={sign_up}>
                      Stwórz nowe konto
                  </button>
          </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
    },
    logoutModal() {
        var logout = function() {
            Meteor.logout();
            //window.location.reload();
        };
        var change = function(event) {
            var $modal = $(event.target).closest('.modal-body');
            var credentials = $modal.find("#change_password");
            var old_pass = credentials.find("#old_password")[0].value;
            var new_pass = credentials.find("#new_password")[0].value;
            var new_pass_confirm = credentials.find("#new_password_confirm")[0].value;
            if (new_pass == new_pass_confirm) {
                Accounts.changePassword(old_pass, new_pass);
            }
        };
        var show_change = function(event) {
            var $modal = $(event.target).closest('.modal-body');
            $modal.find("#logged_user_ui-buttons").hide();
            $modal.find("#change_password").show();
        };
        return <div id="accountModal" className="modal fade" role="dialog">
  <div className="modal-dialog">

    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Logout</h4>
      </div>
      <div className="modal-body">

          <div id="change_password" style={{display: "none"}}>
                  <label htmlFor="old_password">Stare hasło</label>
                  <input id='old_password' className='form-control' type='password' />
                  <label htmlFor="new_password">Nowe hasło</label>
                  <input id='new_password' className='form-control' type='password' />
                  <label htmlFor="new_password_confirm">Powtórz nowe hasło</label>
                  <input id='new_password_confirm' className='form-control' type='password' />

              <button type="button" className="btn btn-primary"
                   onClick={change}>
                  Zmień hasło
              </button>
          </div>

          <div id="logged_user_ui-buttons">
              <button type="button" className="btn btn-primary"
                   onClick={show_change}>
                  Zmień hasło
              </button>
            <button type="button" className="btn btn-primary" data-dismiss="modal"
                 onClick={logout}>
                Sign out
            </button>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
    }
});
