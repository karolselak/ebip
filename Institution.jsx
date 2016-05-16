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
                  <h2>{this.data.institution && <a href={'/i/'+this.data.institution.name}>{this.data.institution.name}</a>}</h2>
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
        </div>


    },
    renderMenus() {
        return this.data.institution.sideMenus.map((menu)=>{
            return (
                <div>
                  <div><a href="#"><b>{menu.header}</b></a></div>
                  <ul className="sidebar-nav">
                  {this.renderFilterLinks(menu)}
                  </ul>
                </div>

        )})
    },
    renderFilterLinks(menu) {
        return menu.filters.map((el)=>{
            return (
            <li>
                <a href="#">{el.title}</a>
            </li>
        )})
    },
    renderContent() {
        if (this.props.is_about) {
            console.log('is_about')
            console.log(this.data.institution)
            if (this.data.institution) {
                return <section itemScope itemType="http://schema.org/GovernmentOrganization">
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
	                    <b>Liczba pracowników: </b>
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
});
