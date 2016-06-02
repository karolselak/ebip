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
        </div>
    }
});
