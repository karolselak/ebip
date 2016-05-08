Institution = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var ins = Institutions.findOne({name: this.props.institution});
        var articles;
         if (!this.props.is_about){
            if (this.props.article) {
                articles = [Articles.findOne(this.props.article)]
            } else {
                articles = Articles.find({institution_id: ins && ins._id});
                if (this.props.phrase){
                    var temp = "/"+this.props.phrase+"/i"
                    var re = new RegExp(temp)
                    articles = articles.find({$or: [{tags: this.props.phrase},{content: re},{ title: re}]}).fetch()
                } else if (this.props.tags) {
                    articles = articles.find({tags : this.props.tags}).fetch()
                } else {
                    articles = articles.fetch()
                }
            }
        }
        return {
            articles: articles,
            institution: ins
        };
    },
    /*getMeteorData() {
        var ins = Institutions.findOne({name: this.props.institution});
        var articles;
        if (this.props.tags) {
            var temp= "/"+this.props.phrase+"/i"
            var re = new RegExp(temp)
            articles = Articles.find({$and: [{
                institution_id: ins && ins._id
            }, {
                $or: [{tags: this.props.phrase},{content: re},{ title: re}]
            }]}).fetch()
        } else if (this.props.phrase){
            //TODO Martin: a także tego przypadku, tzn. gdy podana jest fraza do wyszukania (w tytule, tekście lub tagach)
        } else if (!this.props.is_about){
            articles = Articles.find({institution_id: ins && ins._id}).fetch()
        }
        return {
            articles: articles,
            institution: ins
        };
    },*/

    render() {
        //TODO Hubert: wyświetlanie panelu bocznego instytucji (sideMenus), wraz z możliwością ich edycji
        //(edycja, dodawanie i kasowanie kategorii oraz filtrów z tagami, struktura według InstitutionSchema).
        _Institution = this;
        return <div className='container' id='institution'>
            {/*nagłówek z nazwą instytucji: */}
            <div className="row">
              <div className="col-md-12">
                <div id='centerTopSection'>
                  <p><h2>{this.data.institution && this.data.institution.name}</h2></p>
                  <p id="aboutUs-p"><a href={'/i/' + (this.data.institution && this.data.institution.name) + '/about'}>O nas</a></p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                  <div id="sidebar-wrapper">
                      {this.data.institution && this.renderMenus()}
                  </div>
              </div>
              <div className="col-md-9">
                {this.renderContent()}
              </div>
          </div>
          <div className="row">
            <div id="sidebar-buttons">
              <div className="col-md-12">
                <button type="button" className="btn btn-warning" data-toggle='modal' data-target='#addFilterModal'>Dodaj filtr</button>
              </div>
              <div className="col-md-12">
                <button type="button" className="btn btn-warning" data-toggle='modal' data-target='#deleteFilterModal'>Usuń naglowek</button>
              </div>
              <div className="col-md-12">
                <button type="button" className="btn btn-warning" data-toggle='modal' data-target='#addFilterHeaderModal'>Dodaj nagłówek</button>
              </div>
            </div>
          </div>

          {/*dodawanie filtrow*/}
          <div className='modal fade' id='addFilterModal' role='dialog'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal'>&times;</button>
                        <h4 className='modal-title'>Dodaj filtr</h4>
                    </div>
                    <div className='modal-body'>
                        <div>Filtr:</div>
                        <input id='title' className='form-control' type='text'></input>
                        <div>Nagłówek filtru:</div>
                        <div className="dropdown" id='filterHeader'>
                            <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Wybierz Nagłówek
                            <span className="caret"></span></button>
                            <ul className="dropdown-menu">
                                {this.renderDropdownHeaders()}
                            </ul>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='pbtn' className='btn btn-success' data-dismiss='modal'>Dodaj</button>
                        <button type='button' className='btn btn-default' data-dismiss='modal'>Anuluj</button>
                    </div>
                </div>
            </div>
          </div>
          {/*usuwanie filtrow*/}
          <div className='modal fade' id='deleteFilterModal' role='dialog'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal'>&times;</button>
                        <h4 className='modal-title'>Usuń nagłówek filtru wraz z filtrami</h4>
                    </div>

                    <div>Nagłówek filtru:</div>
                    <div className="dropdown" id='filterHeader'>
                        <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Wybierz nagłowek do usunięcia
                        <span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          <li>naglowek1</li>
                          <li>naglowek2</li>
                          <li>naglowek3</li>
                        </ul>
                    </div>

                    <div className='modal-footer'>
                        <button type='button' id='pbtn' className='btn btn-success' data-dismiss='modal'>Usuń</button>
                        <button type='button' className='btn btn-default' data-dismiss='modal'>Anuluj</button>
                    </div>
                </div>
            </div>
        </div>
        {/*dodawanie naglowkow*/}
          <div className='modal fade' id='addFilterHeaderModal' role='dialog'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal'>&times;</button>
                        <h4 className='modal-title'>Dodaj nagłówek</h4>
                    </div>
                    <div className='modal-body'>
                        <div>Nagłówek filtru:</div>
                        <input id='title' className='form-control' type='text'></input>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='pbtn' className='btn btn-success' data-dismiss='modal'>Dodaj</button>
                        <button type='button' className='btn btn-default' data-dismiss='modal'>Anuluj</button>
                    </div>
                </div>
            </div>
        </div>
      </div>




    },
    renderMenus() {
        return this.data.institution.sideMenus.map((menu, idx)=>{
            return (
                <div id={idx}>
                  <div><button type="button" className="btn btn-xs btn-default" >
                      <span className="glyphicon glyphicon-trash" aria-label="Usuń"></span>
                  </button>
                  <a href="#"><b>{menu.header}</b></a></div>
                  <ul className="sidebar-nav">
                  {this.renderFilterLinks(menu)}
                  </ul>
                </div>

        )})
    },
    renderFilterLinks(menu) {
        return menu.filters.map((el, idx)=>{
            return (
            <li id={idx}>
                  <button type="button" className="btn btn-xs btn-default" onClick={this.deleteFilter}>
                      <span className="glyphicon glyphicon-trash" aria-label="Usuń"></span>
                  </button>
                  <a href="#">{el.title}</a>
            </li>
        )})
    },
      deleteFilter(event) {
         var filterId = $(event.target).closest('li')[0].id;
         var headerId = $(event.target).closest('div')[0].id;
         debugger
         Meteor.call('removeInstitutionFilter',this.data.institution._id, filterId, headerId);
         /*
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
        })*/
    },
    renderDropdownHeaders() {
        if(!this.data.institution)
            return null;
        var arr = this.data.institution && this.data.institution.sideMenus.map((el)=>{return el.header})
        arr.push('');
        for (var i in arr) {
            if (this.state && arr[i] == this.state.selectedParent) {
                arr.splice(i,1);
            }
        }
        return arr.map((el)=>{
            return <li onClick={this.selectParent}><a href='#' id={el}>{el || ' - brak rodzica - '}</a></li>;
        });
    },

    renderContent() {
        if (this.props.is_about) {
            if (this.data.institution) {
                return
                <section itemScope itemType="http://schema.org/GovernmentOrganization">
                    <div>
                        <b>Adres:</b><br/>
	                    <span itemProp="name">{this.data.institution.name}</span><br/>
	                    <section itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
		                    <span itemProp="streetAddress">{this.data.institution.address.streetAddress}</span><br/>
		                    <span itemProp="postalCode">{this.data.institution.address.postalCode} </span>
		                    <span itemProp="addressLocality">{this.data.institution.address.addressLocality}</span>
	                    </section>
                    </div>
                    <div>
    	                <b>Email:</b> <span itemProp="email">{this.data.institution.email}</span>
	                </div>
                    <div>
    	                <b>Telefon:</b> <span itemProp="telephone">{this.data.institution.telephone}</span>
                    </div>
                    <div>
	                    <b>Liczba pracowników:</b>
                        <span itemProp="numberOfEmployees">{this.data.institution.numberOfEmployees}</span>
	                </div>
                </section>
            } else {
                return <section />
            }
        } else {
            return <ArticleView articles={this.data.articles} institution={this.data.institution}/>
        }
    }
}
);
