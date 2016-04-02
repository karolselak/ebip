ArticleView = React.createClass({
    render() {
        //TODO Kaj: usuwanie artykułów
        return <div>
            {/*przycisk dodawania artykułów*/}

            <div className='container'>
              <div className="row">
                <div className="col-md-9" id="bottom-Row">
                  <div id="bottom-button-add-article">
                    <button type='button'  className='btn btn-info' data-toggle='modal' data-target='#addArticleModal'>Dodaj artykuł</button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
              {/*artykuły*/}
              {this.renderArticles()}
                </div>
              </div>
            </div>
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
    },
    renderArticles() {
        return this.props.articles.map(function(el){
            return <div>
                {/*TODO Hubert: dodać tu datę publikacji oraz autora, poprawić wygląd*/}
                <div><a><b>{el.title}</b></a></div>
                <div>{el.content}</div>
                <div>{el.publicationDate && (new Date(el.publicationDate)).toLocaleDateString()}</div>
                <div>{el.author}</div>
            </div>
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
    addArticle(event) {
        var $modal = $(event.target).closest('.modal-content');
        var $title = $modal.find('#title')[0];
        var $content = $modal.find('#content')[0];
        var $tags = $modal.find('#tags')[0];
        var expirationDate = $modal.find('#expirationDate').data('DateTimePicker').date();
        if (event.target.id == 'pbtn') {
            var publicationDate = (new Date()).getTime();
        } else {
            var d = $modal.find('#publicationDate').data('DateTimePicker').date();
            var publicationDate = d ? d._d.getTime() : Infinity;
        }
        Meteor.call('addArticle', {
            title: $title.value,
            content: $content.value,
            institution_id: this.props.institution._id,
            //TODO usuwanie spacji
            tags: $tags.value ? $tags.value.split(', ') : [],
            publicationDate: publicationDate
        })
    }
});
