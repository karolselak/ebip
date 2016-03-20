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
<<<<<<< HEAD
    render()
    {
        //TODO Hubert: wyświetlanie panelu bocznego instytucji (sideMenus), wraz z możliwością ich edycji
        //(edycja, dodawanie i kasowanie kategorii oraz filtrów z tagami, struktura według InstitutionSchema).

        ///Cos tlo w menu bocznym nie chce mi dzialac :(

        //TODO Kaj: usuwanie artykułów
        return <div className='container' id='institution'>
            <div className="row">
              <div className="col-md-3">
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
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
                  </ul>
              </div>
              </div>

                <div className="col-md-9">
                  <div className="row">
                    <renderArticles/>
                  </div>
                  <div className="row" id="row-add-article">
                    <h2>{this.data.institution && this.data.institution.name}</h2>
                    <button type='button' className='btn btn-info' data-toggle='modal' data-target='#addArticleModal'>Dodaj artykuł</button>
                    {this.renderArticles()}
                    {/*okno dodawania artykułów: */}
                    <div className='modal fade' id='addArticleModal' role='dialog'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button type='button' className='close' data-dismiss='modal'>&times;</button>
                                <h4 className='modal-title'>Dodaj artykuł</h4>
                            </div>
                            <div className='modal-body'>
                                <div>Tytuł:</div>
                                <input id='title' className='form-control' type='text'></input>
                                <div>Treść:</div>
                                <textarea id='content' className='form-control' rows='5' cols='80'></textarea>
                                <div>Tagi:</div>
                                <input id='tags' type='text' className='form-control' placeholder='tag1, tag2...'></input>
                                {/*TODO Hubert: dodawanie autora, którym może być jeden z urzędników (officials) istniejących w naszej instytucji.
                                   Trzeba stworzyć listę wyboru, gdzie będzie można wybrać jednego z nich.*/}
                                <div>Data publikacji:</div>
                                <div className='input-group date' id='publicationDate'>
                                    <input type='text' className='form-control' placeholder='nieokreślona'/>
                                    <span className='input-group-addon'>
                                        <span className='glyphicon glyphicon-calendar'></span>
                                    </span>
                                </div>
                                <div>Data wygaśnięcia:</div>
                                <div className='input-group date' id='expirationDate'>
                                    <input type='text' className='form-control' placeholder='nieokreślona'/>
                                    <span className='input-group-addon'>
                                        <span className='glyphicon glyphicon-calendar'></span>
                                    </span>
                                </div>
                                <div>Autor:</div>
                                  <div className="dropdown" id='author'>
                                    <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Wybierz Autora
                                    <span className="caret"></span></button>
                                      <ul className="dropdown-menu">
                                        <li>Mariolka</li>
                                        <li>Buhal</li>
                                        <li>gdzie reszta?</li>
                                      </ul>
                                  </div>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' id='pbtn' className='btn btn-success' data-dismiss='modal' onClick={this.addArticle} >Publikuj</button>
                                <button type='button' id='sbtn' className='btn btn-info' data-dismiss='modal' onClick={this.addArticle} >Zapisz wersję roboczą</button>
                                <button type='button' className='btn btn-default' data-dismiss='modal'>Anuluj</button>
                            </div>
                        </div>
                    </div>
                    </div>
                  </div>
                </div>

            </div>

=======
    render() {   
        //TODO Hubert: wyświetlanie panelu bocznego instytucji (sideMenus), wraz z możliwością ich edycji
        //(edycja, dodawanie i kasowanie kategorii oraz filtrów z tagami, struktura według InstitutionSchema).
        return <div className='container' id='institution'>
            {/*nagłówek z nazwą instytucji: */}
            <h2>{this.data.institution && this.data.institution.name}</h2>
            {this.renderContent()}
>>>>>>> 075833afadff75e8bad7920b817cb11f898ca7ff
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
<<<<<<< HEAD
            var d = $modal.find('#publicationDate').data('DateTimePicker').date();
            var publicationDate = d ? d._d.getTime() : Infinity;
        }
        Meteor.call('addArticle', {
            title: $title.value,
            content: $content.value,
            institution_id: this.data.institution._id,
            tags: $tags.value ? $tags.value.split(', ') : [],
            publicationDate: publicationDate
        })
    },
    componentDidMount(){
        $(function () {
            var $pd = $('#publicationDate');
            var $ed = $('#expirationDate');
            $pd.datetimepicker({locale: 'pl'});
            $pd.data('DateTimePicker').minDate(new Date());
            $pd.data('DateTimePicker').clear();
            $ed.datetimepicker({locale: 'pl'});
            $ed.data('DateTimePicker').minDate(new Date());
            $ed.data('DateTimePicker').clear();
        });
    },
    renderArticles() {
        return this.data.articles.map(function(el){
            return <div>
                {/*TODO Hubert: dodać tu datę publikacji oraz autora, poprawić wygląd*/}
                <div id="tytul">{el.title}</div>
                <div id="tresc">{el.content}</div>
                <div id="dataPublikacji">{el.publicationDate}</div>
                <div id="autor">{el.author}</div>
            </div>
        })
    },
=======
            return <ArticleView articles={this.data.articles} institution={this.data.institution}/>
        }
    }
>>>>>>> 075833afadff75e8bad7920b817cb11f898ca7ff
});
