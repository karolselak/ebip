//strona główna:
FlowRouter.route('/', {
    action() {
        ReactLayout.render(MainLayout, {content: <Homepage />});
    }
});
//strona instytucji:
FlowRouter.route('/i/:institution', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//widok konkretnego artykułu:
FlowRouter.route('/i/:institution/article/:article', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//widok treści filtrowanej według tagów:
FlowRouter.route('/i/:institution/tags/:tags', {
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
FlowRouter.route('/i/:institution/search/:phrase', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//informacje ogólne nt. instytucji:
FlowRouter.route('/i/:institution/about', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params} is_about={true} />});
    }
});
//lista zdefiniowanych typów mikrodanych
FlowRouter.route('/itemtypes', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <ItemTypesList />});
    }
});
//podgląd typu mikrodanych
FlowRouter.route('/itemtype/:itemname', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <ItemType {...params} />});
    }
});
//Uprawnienia urzytkownikow
FlowRouter.route('/permissions', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Permissions />});
    }
});
