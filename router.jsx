//strona główna:
FlowRouter.route('/', {
    action() {
        ReactLayout.render(MainLayout, {content: <Homepage />});
    }
});
//strona instytucji:
FlowRouter.route('/:institution', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//widok konkretnego artykułu:
FlowRouter.route('/:institution/article/:article', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//widok treści filtrowanej według tagów:
FlowRouter.route('/:institution/tags/:tags', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//wyszukiwanie globalne:
FlowRouter.route('/search/:phrase', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <SearchResults {...params}/>});
    }
});
//wyszukiwanie lokalne (w ramach danej instytucji):
FlowRouter.route('/:institution/search/:phrase', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//informacje ogólne nt. instytucji:
FlowRouter.route('/:institution/about', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params} is_about={true} />});
    }
});
