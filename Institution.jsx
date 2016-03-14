Institution = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            articles: Articles.find().fetch()
        };
    },
    render()
    {
        {/*TODO Łukasz: wyświetlanie wszystkich artykułów (this.data.articles) oraz dodawanie nowych, analogicznie jak dzieje się to w Homepage.jsx*/}
        return <div className="container" id="institution">
            <button type="button" className="btn btn-info" data-toggle="modal" data-target="#addArticleModal">Dodaj artykuł</button>

            {/*okno dodawania instytucji: */}
            <div className="modal fade" id="addArticleModal" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Dodaj artykuł</h4>
                    </div>
                    <div className="modal-body">
                        <div>Tytuł:</div>
                        <input id='title' type="text"></input>
                        <div>Treść:</div>
                        <textarea id='content' rows='5' cols='80'></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.addArticle} >Dodaj</button>
                        <button type="button" className="btn btn-default" data-dismiss="modal">Anuluj</button>
                    </div>
                </div>
            </div>
            </div>
            {this.renderArticles()}
        </div>
    },
    addArticle(event) {
        var $modal = $(event.target).closest('.modal-content');
        var title = $modal.find('#title')[0];
        var content = $modal.find('#content')[0];
        Meteor.call('addArticle', {
            title: title.value,
            content: content.value
        })
    },
    renderArticles() {
        return this.data.articles.map(function(el){
            return <div>
                <div><a>{el.title}</a></div>
                <div>{el.content}</div>
            </div>
        })
    },
});
