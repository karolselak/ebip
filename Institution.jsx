Institution = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var ins = Institutions.findOne({name: this.props.institution});
        var articles;
        if (this.props.tags) {
            //TODO Martin: obsłużenie tego przypadku, tzn. gdy są podane tagi (tags = 'tag1,tag2,tag3) i musimy wyświetlać
            //tylko te artykuły, które owe tagi posiadają
        } else if (this.props.phrase){
            //TODO Martin: a także tego przypadku, tzn. gdy podana jest fraza do wyszukania (w tytule, tekście lub tagach)
        } else if (!this.props.is_about){
            articles = Articles.find({institution_id: ins && ins._id}).fetch()
        }
        return {
            articles: articles,
            institution: ins
        };
    },

    render() {
        //TODO Hubert: wyświetlanie panelu bocznego instytucji (sideMenus), wraz z możliwością ich edycji
        //(edycja, dodawanie i kasowanie kategorii oraz filtrów z tagami, struktura według InstitutionSchema).
        return <div className='container' id='institution'>
            {/*nagłówek z nazwą instytucji: */}

            <div className="col-md-3">
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-title">
                          <a href="#">
                                informacje
                          </a>
                        </li>
                        <li>
                          <a href="#">?????</a>
                        </li>
                        <li>
                          <a href="#">!!!!</a>
                        </li>
                        <li>
                          <a href="#">#####</a>
                        </li>
                        <li>
                          <a href="#">@@@@@</a>
                        </li>
                        <li>
                          <a href="#">%%%%%</a>
                        </li>
                        <li>
                          <a href="#">&&&&&</a>
                        </li>
                        <li>
                          <a href="#">:))))))))</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-md-9">
              <h2>{this.data.institution && this.data.institution.name}</h2>
              {this.renderContent()}
            </div>
        </div>
    },
    renderContent() {
        if (this.props.is_about) {
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
    	                <b>Telefon:</b> <span itemProp="email">{this.data.institution.telephone}</span>
	                </div>
                    <div>
	                    <b>Liczba pracowników:</b> <span itemProp="email">{this.data.institution.numberOfEmployees}</span>
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
