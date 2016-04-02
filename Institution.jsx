Institution = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var ins = Institutions.findOne({name: this.props.institution});
        var articles;
         if (!this.props.is_about){
            articles = Articles.find({institution_id: ins && ins._id})
             if (this.props.phrase){
                var temp= "/"+this.props.phrase+"/i"
                var re = new RegExp(temp)
                articles = articles.find({$or: [{tags: this.props.phrase},{content: re},{ title: re}]}).fetch()
            } else if (this.props.tags) {
                articles = articles.find({tags : this.props.tags}).fetch()
            } else {
                articles=articles.fetch()
            }
        }
        return {
            articles: articles,
            institution: ins
        };
    },
    getMeteorData() {
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
    },

    render() {   
        //TODO Hubert: wyświetlanie panelu bocznego instytucji (sideMenus), wraz z możliwością ich edycji
        //(edycja, dodawanie i kasowanie kategorii oraz filtrów z tagami, struktura według InstitutionSchema).
        TTT = this;
        return <div className='container' id='institution'>
            {/*nagłówek z nazwą instytucji: */}
            <h2>{this.data.institution && this.data.institution.name}</h2>
            <a href=''ZZ>O nas</a>
            {this.renderContent()}

            <div className="col-md-3">
                <div id="sidebar-wrapper">
                    {this.data.institution && this.renderMenus()}
                    {/*<ul className="sidebar-nav">
                        <li className="sidebar-title">
                          <a href="#">
                              fuck her right in the pussy
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
                    </ul>*/}
                </div>
            </div>
            
        </div>
    },
    renderMenus() {
        return this.data.institution.sideMenus.map((menu)=>{
            return <ul className='sidebar-nav'>
                <li className="sidebar-title">
                    <a href="#">{menu.header}</a>
                </li>
                {this.renderFilterLinks(menu)}
            </ul>
        })
    },
    renderFilterLinks(menu) {
        return menu.filters.map((el)=>{
            return <li className="sidebar-title">
                <a href="#">{el.title}</a>
            </li>
        })
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
