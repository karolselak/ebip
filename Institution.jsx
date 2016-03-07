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
        return <div>
            Institution
        </div>
    }
});
