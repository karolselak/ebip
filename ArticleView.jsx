ArticleView = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            articleTypes: ItemTypes.find({inheritsFrom: {$in: ['Article']}}).fetch(),
            user: Meteor.user()
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
        return <div>
            {/*przycisk dodawania artykułów*/}
            <div className='container'>
              <div className='row'>
                  {/*artykuły*/}
                  {this.renderArticles()}
              </div>
              <div className='row'>
                <div className='col-md-10' id='bottom-Row'>
                  {this.addArticleButton()}
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
                        <div>Typ artykułu:</div>
                        <div className='dropdown' id='author'>
                            <button className='btn btn-default dropdown-toggle' type='button' id='menu1' data-toggle='dropdown'>{this.renderSelectedType()} <span className='caret'></span>
                            </button>
                            <ul className='dropdown-menu'>
                                {this.renderDropdownTypes()}
                            </ul>
                        </div>
                        <div className='extensions-wrapper'>
                            {this.renderExtendedModal()}
                        </div>                        
                        <div>Autor:</div>
                        <input id='author' className='form-control' type='text'></input>
                        <div>Dodaj załącznik: </div>
                        <input type='file' id='file' />
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='pbtn' className='btn btn-success' data-dismiss='modal' onClick={this.addArticle} >Publikuj</button>
                        <button type='button' id='sbtn' className='btn btn-info' data-dismiss='modal' onClick={this.addArticle} >Zapisz wersję roboczą</button>
                        <button type='button' id='abtn' className='btn btn-default' data-dismiss='modal'>Anuluj</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    },
    renderExtendedModal() {
        var artType = this.data.articleTypes.find((el)=>{return el.name == this.state.selectedType});
        if (artType) {
            return artType.properties.map((el)=>{
                return <div>
                    <div>{el+':'}</div>
                    <input id={el} className='form-control extensions' type='text'></input>
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
    cutContent(content) {
        return content;
    },
    renderArticles() {
        return this.props.articles && this.props.articles.map((el)=>{
            var now = (new Date()).getTime();
            if (el && ((this.data.user && (this.data.user.GlobalRight || (this.data.user.institutions && this.data.user.institutions.includes(this.props.institution._id)))) ||
            (el.publicationDate < now && (el.expirationDate > now || !el.expirationDate)))) {
                var attachment = Attachments.findOne({"_id":el.attachment_id});
                return <div className='row' id={el._id}>
                    <br />
                    {/*TODO Hubert: dodać tu datę publikacji oraz autora, poprawić wygląd*/}
                    <div>
                        <a href={this.props.institution && '/i/'+this.props.institution.name+'/article/'+el._id}>
                            <b>{el.title}</b>
                        </a> <span style={{color:'red'}}><i>{
                            el.publicationDate > now || !el.publicationDate ? '(wersja robocza)' : el.expirationDate && el.expirationDate < now ? '(wygaśnięty)' : null
                        }</i></span>
                        <span className='pull-right'>
                          <div>
                            {this.articleEditButtons()}
                            {' '}{el.author} {el.publicationDate
                            && el.publicationDate != Infinity ? (new Date(el.publicationDate)).toLocaleDateString()
                            : ''}
                          </div>
                        </span>
                    </div>
                    <br />
                    <div>{this.props.ifFull ? el.content : el.content.slice(0,150).trim()+'...'}
                        {this.props.ifFull ? null : <a href={this.props.institution && '/i/'+this.props.institution.name+'/article/'+el._id}> Czytaj całość »</a>}</div>
                    {attachment ? <div><a href={attachment.url()} download>{attachment.name()}</a></div> : null}
                </div>
            } else {
                return null;
            }
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
        var id = $(event.target).closest('.row')[0].id;
        this.setState({nowEdited: id});
        var $modal = $('#editArticleModal');
        var article = this.props.articles.find(function(el){return el._id == id});
        this.setState({selectedType: article.type}, ()=>{
            $modal.find('#title')[0].value = article.title;
            $modal.find('#content')[0].value = article.content;
            $modal.find('#tags')[0].value = article.tags;
            var $ed = $modal.find('#expirationDate');
            var $pd = $modal.find('#publicationDate');        
            if (article.expirationDate) {
                $ed.data('DateTimePicker').minDate(new Date(article.expirationDate));
                $ed.data('DateTimePicker').date(new Date(article.expirationDate));
            } else {
                $ed.data('DateTimePicker').date(null);        
            }
            if (article.publicationDate) {
                $pd.data('DateTimePicker').minDate(new Date(article.publicationDate));
                $pd.data('DateTimePicker').date(new Date(article.publicationDate));
            } else {
                $pd.data('DateTimePicker').date(null);        
            }
            var artType = this.data.articleTypes.find((el)=>{return el.name == article.type});
            console.log(this.state.selectedType);
            console.log(artType);
            if (artType) {
                var $extensions = $modal.find('.extensions-wrapper');
                artType.properties.map((el)=>{
                    $extensions.find('#'+el)[0].value = article[el];
                });
            }
        
        });
        //this.forceUpdate();



    },
    addArticle(event) {
        var $modal = $(event.target).closest('.modal-content');
        var $title = $modal.find('#title')[0];
        var $author = $modal.find('#author')[0];
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
        if (event.target.id == 'pbtn' && !this.state.nowEdited) {
            var publicationDate = (new Date()).getTime();
        } else {
            var d = $modal.find('#publicationDate').data('DateTimePicker').date();
            var publicationDate = d ? d._d.getTime() : Infinity;
        }
        var file = $modal.find('#file')[0].files[0];
        var ins_id = this.props.institution._id;
        var obj = {
            title: $title.value,
            content: $content.value,
            author: $author.value,
            institution_id: ins_id,
            type: this.state.selectedType,
            tags: $tags.value ? $tags.value.split(',').map(function(el){return el.trim()}) : [],
            publicationDate: publicationDate,
            expirationDate: expirationDate,
        }
        _.extend(obj, extensions)
        if (this.state.nowEdited) {
            if (file) {
                Attachments.insert(file, function(err, fileObj) {
                    if (!err) {
                        obj.attachment_id = fileObj._id;
                        Meteor.call('updateArticle', this.state.nowEdited, obj);
                    }
                });
            } else {
                Meteor.call('updateArticle', this.state.nowEdited, obj);            
            }
        } else {
            if (file) {
                Attachments.insert(file, function(err, fileObj) {
                    if (!err) {
                        obj.attachment_id = fileObj._id;
                        Meteor.call('addArticle', obj);
                    }
                });
            } else {
                Meteor.call('addArticle', obj);
            }
        }
    },
    removeArticle(event) {
        if (confirm("Czy na pewno chcesz usunąć artykuł?")) {
            Meteor.call('removeArticle', $(event.currentTarget).closest('.row')[0].id);
        }
    },
    articleEditButtons(){
      var inst=-1;
      if ( this.data.user) {
        if(this.data.user.institutions ){
          inst=this.data.user.institutions.indexOf(this.props.institution._id );
        }
        if ( this.data.user.GlobalRight===true ||inst!=-1) {
          return <div>
                    <button type='button' id="deleteArticleButton" className='btn btn-xs btn-default'
                        onClick={this.removeArticle}>
                        <span className='glyphicon glyphicon-trash'
                            aria-label='Usuń'></span>
                    </button>
                    <button type='button' className='btn btn-xs btn-default'
                        data-toggle='modal' data-target='#editArticleModal' onClick={this.editArticle}>
                        <span className='glyphicon glyphicon-pencil'
                            aria-label='Edytuj'></span>
                    </button>
                  </div>
        }
      }
    },
    addArticleButton(){
      var inst=-1;
      if ( this.data.user) {
        if(this.data.user.institutions && this.props.articles){
          inst=this.data.user.institutions.indexOf(this.props.institution._id );
        }
        if ( this.data.user.GlobalRight===true ||inst!=-1) {
          return <div id='bottom-button-add-article'>
                    <button type='button'  className='btn btn-info' data-toggle='modal' data-target='#editArticleModal'>Dodaj artykuł</button>
                  </div>
        }
      }
    }
});
