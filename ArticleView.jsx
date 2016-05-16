ArticleView = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            articleTypes: ItemTypes.find({inheritsFrom: {$in: ['article']}}).fetch()
        };
    },
    getInitialState() {
        return {
            selectedType: '',
            selectedAuthor: '',
            nowEdited: ''
        }
    },
    render() {
        _ArticleView = this;
        var e = this.props.articles && this.props.articles.find((el)=>{el.id == this.state.nowEdited});
        return <div>
            {/*przycisk dodawania artykułów*/}

            <div className='container'>
              <div className='row'>
                <div className='col-md-9' id='articles'>
                  {/*artykuły*/}
                  {this.renderArticles()}
                </div>
              </div>
              <div className='row'>
                <div className='col-md-10' id='bottom-Row'>
                  <div id='bottom-button-add-article'>
                    <button type='button'  className='btn btn-info' data-toggle='modal' data-target='#editArticleModal'>Dodaj artykuł</button>
                  </div>
                </div>
              </div>
            </div>
            {/*okno edycji artykułów: */}
            <div className='modal fade' id='editArticleModal' role='dialog'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal'>&times;</button>
                        <h4 className='modal-title'>Edytuj artykuł</h4>
                    </div>
                    <div className='modal-body'>
                        <div>Tytuł:</div>
                        <input id='title' className='form-control' type='text' value={e && e.title}></input>
                        <div>Treść:</div>
                        <textarea id='content' className='form-control' rows='5' cols='80'>{e && e.content}</textarea>
                        <div>Tagi:</div>
                        <input id='tags' type='text' className='form-control' placeholder='tag1, tag2...' value={e && e.tags}></input>
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
                        <div>Typ artykułu:</div>
                        <div className='dropdown' id='author'>
                            <button className='btn btn-default dropdown-toggle' type='button' id='menu1' data-toggle='dropdown'>{this.renderSelectedType()} <span className='caret'></span>
                            </button>
                            <ul className='dropdown-menu'>
                                {this.renderDropdownTypes()}
                            </ul>
                        </div>
                        {this.renderExtendedModal()}
                        <div>Autor:</div>
                        <div className='dropdown' id='author'>
                            <button className='btn btn-default dropdown-toggle' type='button' id='menu1' data-toggle='dropdown'>Wybierz Autora
                            <span className='caret'></span></button>
                            <ul className='dropdown-menu'>
                                <li>Mariolka</li>
                                <li>Buhal</li>
                                <li>gdzie reszta?</li>
                            </ul>
                        </div>
                        <div>Dodaj załącznik: </div>
                        <input type='file' id='file' />
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
    renderExtendedModal() {
        if (this.state.selectedType) {
            return this.data.articleTypes.find((el)=>{return el.name == this.state.selectedType}).properties.map((el)=>{
                return <div>
                    <div>{el.name+':'}</div>
                    <input id={el.name} className='form-control extensions' type='text'></input>
                </div>
            })
        }
    },
    renderSelectedType() {
        if (!this.state.selectedType) {
            return <span>brak typu</span>;
        } else {
            return <span>{this.state.selectedType}</span>;
        }
    },
    renderDropdownTypes() {
        var arr = this.data.articleTypes.map((el)=>{return el.name})
        arr.push('');
        for (var i in arr) {
            if (arr[i] == this.state.selectedType) {
                arr.splice(i,1);
            }
        }
        return arr.map((el)=>{
            return <li onClick={this.selectType}><a href='#' id={el}>{el || ' - brak typu - '}</a></li>;
        });
    },
    selectType(event) {
        this.setState({selectedType: event.target.id})
    },
    renderArticles() {
        return this.props.articles && this.props.articles.map((el)=>{
//<<<<<<< HEAD
         /*   
            
            return <div id={el._id}>
                <button type="button" className="btn btn-xs btn-default" onClick={this.removeArticle}>
                    <span className="glyphicon glyphicon-trash" aria-label="Usuń"></span>
                </button>
                <div><a href={this.props.institution && '/i/'+this.props.institution.name+'/article/'+el._id}><b>{el.title}</b></a></div>
                <div>{el.content}</div>
                <div>{el.publicationDate && (new Date(el.publicationDate)).toLocaleDateString()}</div>
                <div>{el.author}</div>
                {(function(){
                    if (attachment) {
                        console.log('attachment:')
                        console.log(attachment)
                        return <div><a href={attachment.url()} download>{attachment.name()}</a></div>                    
                    }                
                })()}*/
//=======
            if (!el) {
                return null;
            }           
            var attachment = Attachments.findOne({"_id":el.attachment_id});
            return <div className='row' id={el._id}>
                <br />
                {/*TODO Hubert: dodać tu datę publikacji oraz autora, poprawić wygląd*/}
                <div>
                    <a href={this.props.institution && '/i/'+this.props.institution.name+'/article/'+el._id}>
                        <b>{el.title}</b>
                    </a>
                    <span className='pull-right'>
                        <button type='button' className='btn btn-xs btn-default'
                            onClick={this.removeArticle}>
                            <span className='glyphicon glyphicon-trash'
                                aria-label='Usuń'></span>
                        </button>
                        <button type='button' className='btn btn-xs btn-default'
                            data-toggle='modal' data-target='#editArticleModal' onClick={this.editArticle}>
                            <span className='glyphicon glyphicon-pencil'
                                aria-label='Edytuj'></span>
                        </button>
                        {' '}{el.author} {el.publicationDate
                        && el.publicationDate != Infinity ? (new Date(el.publicationDate)).toLocaleDateString()
                        : ''}
                        
                    </span>
                </div>
                <br />
                <div className='text-justify'>{el.content}</div>
                {attachment ? <div><a href={attachment.url()} download>{attachment.name()}</a></div> : null}
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
    editArticle(event) {
        this.setState({nowEdited: $(event.target).closest('.row')[0].id});
        var $modal = $('#editArticleModal')
    },
    addArticle(event) {
        var $modal = $(event.target).closest('.modal-content');
        var $title = $modal.find('#title')[0];
        var $content = $modal.find('#content')[0];
        var $tags = $modal.find('#tags')[0];
        var $extensions = $modal.find('.extensions');
        var extensions = {};
        for (var i in $extensions) {
            if ($extensions[i].value) {
                extensions[$extensions[i].id] = $extensions[i].value;
            }
        }
        var expirationDate = $modal.find('#expirationDate').data('DateTimePicker').date();
        if (event.target.id == 'pbtn') {
            var publicationDate = (new Date()).getTime();
        } else {
            var d = $modal.find('#publicationDate').data('DateTimePicker').date();
            var publicationDate = d ? d._d.getTime() : Infinity;
        }
        var file = $modal.find('#file')[0].files[0];
        var ins_id = this.props.institution._id;
        if (file) {
            Attachments.insert(file, function (err, fileObj) {
                if (err) {
                } else {
                    Meteor.call('addArticle', {
                        title: $title.value,
                        content: $content.value,
                        institution_id: ins_id,
                        tags: $tags.value ? $tags.value.split(',').map(function(el){return el.trim()}) : [],
                        publicationDate: publicationDate,
                        extensions: extensions,
                        attachment_id: fileObj._id
                    });
                }
            });
        } else {
            Meteor.call('addArticle', {
                title: $title.value,
                content: $content.value,
                institution_id: this.props.institution._id,
                tags: $tags.value ? $tags.value.split(',').map(function(el){return el.trim()}) : [],
                publicationDate: publicationDate,
                extensions: extensions
            });
        }
    },
    removeArticle(event) {
        Meteor.call('removeArticle', $(event.target).closest('.row')[0].id);
    }
});
