MainLayout = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            institutions: Institutions.find().fetch(),
            user: Meteor.user()
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
        nazwa = nazwa != null ? nazwa.username : "Zaloguj";
        return <div>
            <div className="col-md-3 tileMenu">
                <a className="menuLink" href="/dictionary/" id="dictionaryLink">
                <div className="menuIcon glyphicon glyphicon-book" ></div><div>Słownik</div>
                </a>
              </div>
            {
                this.data.user && this.data.user.GlobalRight ? <div className="col-md-5 tileMenu">
                    <a className="menuLink" href={'/permissions'}>
                    <div className="menuIcon glyphicon glyphicon-cog" ></div><div>Administratorzy</div>
                    </a>
                </div> : null
            }
          <div className="col-md-4 tileMenu">
            <a href="#" data-toggle="modal"
                data-target="#accountModal"><div className=" menuIcon glyphicon glyphicon-user"></div>
            <div>{nazwa}</div></a>
          </div>
          {accountUI}
        </div>
    },
    loginModal() {
        var show_login = function(event) {
            var $modal = $(event.target).closest('.modal-content');
            $modal.find("#sign_up").show();
            $modal.find("#sign_in").hide();
            $(event.target).closest('.modal-footer').find('#sign_in').hide();
            $(event.target).closest('.modal-footer').find('#sign_up').show();
            console.log();
            $modal.find('.modal-header').find('.modal-title')[0]
            .innerText = "Rejestracja";
        };
        var close_login = function(event) {
            var $modal = $(event.target).closest('.modal-content');
            $modal.find("#sign_up").hide();
            $modal.find("#sign_in").show();
            $(event.target).closest('.modal-footer').find('#sign_in').show();
            $(event.target).closest('.modal-footer').find('#sign_up').hide();
            $modal.find('.modal-header').find('.modal-title')[0]
            .innerText = "Logowanie";
        };
        var login = function(event) {
            var $modal = $(event.target).closest('.modal-content');
            var credentials = $modal.find("#sign_in")
            var username = credentials.find('#username')[0].value;
            var password = credentials.find('#password')[0].value;
            Meteor.loginWithPassword(username, password, function(error) {
                console.log(error);
                window.alert(error.reason);
            });
            //console.log(Meteor.loggingIn());
            //window.location.reload();
        };
        var sign_up = function(event) {
            var $modal = $(event.target).closest('.modal-content');
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
                Accounts.createUser(data, function(error) {
                    console.log(error);
                    window.alert(error.reason);
                });
                //while (Meteor.loggingIn()) {

                //}
                //window.location.reload();
            } else {
                window.alert("Hasła nie zgadzają się.");
            }
        };
        return <div id="accountModal" className="modal fade" role="dialog">
            <div className="modal-dialog">

        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Logowanie</h4>
          </div>
          <div className="modal-body">
              <div id="sign_in">
                  <label htmlFor="username">Nazwa użytkownika</label>
                  <input id='username' className='form-control' type='text' />
                  <label htmlFor="password">Hasło</label>
                  <input id='password' className='form-control' type='password' />
              </div>
              <div id="sign_up" style={{display: "none"}}>
                  <label htmlFor="username">Nazwa użytkownika</label>
                  <input id='username' className='form-control' type='text' />
                  <label htmlFor="password">Hasło</label>
                  <input id='password' className='form-control' type='password' />
                  <label htmlFor="password_confirm">Powtórz hasło</label>
                  <input id='password_confirm' className='form-control' type='password' />
              </div>
          </div>
          <div className="modal-footer">
              <button id="sign_in" type="button" className="btn btn-primary" onClick={login}
                  data-dismiss="modal">
                  Zaloguj
              </button>
              <button id="sign_in" className="btn btn-primary"
                   onClick={show_login}>Rejestracja</button>
                  <button id="sign_up" type="button" style={{display: "none"}}
                      className="btn btn-primary" onClick={sign_up} data-dismiss="modal">
                      Stwórz nowe konto
                  </button>
                  <button id="sign_up" type="button" className="btn btn-primary"
                      style={{display: "none"}}
                      onClick={close_login}>
                      Logowanie
                  </button>
            <button type="button" className="btn btn-default"
                data-dismiss="modal">Zamknij</button>
          </div>
        </div>

      </div>
    </div>
    },
    logoutModal() {
        var logout = function() {
            Meteor.logout(function(error) {
                if (error) {
                    console.log(error);
                    window.alert(error.reason);                    
                }
            });
            //window.location.reload();
        };
        var change = function(event) {
            var $modal = $(event.target).closest('.modal-content');
            var credentials = $modal.find("#change_password");
            var old_pass = credentials.find("#old_password")[0].value;
            var new_pass = credentials.find("#new_password")[0].value;
            var new_pass_confirm = credentials.find("#new_password_confirm")[0].value;
            if (new_pass == new_pass_confirm) {
                Accounts.changePassword(old_pass, new_pass, function(error) {
                    console.log(error);
                    window.alert(error.reason);
                });
            } else {
                window.alert("Hasła nie zgadzają się.");
            }
        };
        var show_change = function(event) {
            var $modal = $(event.target).closest('.modal-content');
            $modal.find(".modal-body").show();
            $modal.find("#logged_user_ui-buttons").hide();
            $modal.find("#change_password").show();
            $modal.find(".modal-footer").find("#change_password").show();
        };
        var close_logout = function(event) {
            var $modal = $(event.target).closest('.modal-content');
            $modal.find(".modal-body").hide();
            $modal.find("#logged_user_ui-buttons").show();
            $modal.find("#change_password").hide();
            $modal.find(".modal-footer").find("#change_password").hide();
        };
        return <div id="accountModal" className="modal fade" role="dialog">
  <div className="modal-dialog">

    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Konto</h4>
      </div>
      <div className="modal-body" style={{display: "none"}}>

          <div id="change_password" style={{display: "none"}}>
                  <label htmlFor="old_password">Stare hasło</label>
                  <input id='old_password' className='form-control' type='password' />
                  <label htmlFor="new_password">Nowe hasło</label>
                  <input id='new_password' className='form-control' type='password' />
                  <label htmlFor="new_password_confirm">Powtórz nowe hasło</label>
                  <input id='new_password_confirm' className='form-control' type='password' />
        </div>


        </div>
        <div className="modal-footer">
          <div id="logged_user_ui-buttons">
              <button type="button" className="btn btn-primary"
                   onClick={show_change}>
                  Zmień hasło
              </button>
              <button type="button" className="btn btn-primary" data-dismiss="modal"
                 onClick={logout}>
                Wyloguj
            </button>
        <button type="button" className="btn btn-default" data-dismiss="modal">Zamknij</button>
        </div>
      <div id="change_password" style={{display: "none"}}>
          <button type="button" className="btn btn-primary"
               onClick={change}>
              Zmień hasło
          </button>
          <button type="button" className="btn btn-default"
              onClick={close_logout} data-dismiss="modal">Zamknij</button>
      </div>
    </div>

    </div>
  </div>
</div>
    }
});
