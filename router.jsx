FlowRouter.route('/', {
    action() {
        ReactLayout.render(MainLayout, {content: <Homepage />});
    }
});
FlowRouter.route('/:institution', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
FlowRouter.route('/:institution/:article', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//TODO Martin: nowy route (oraz plik z klasą) do wyświetlania wyników wyszukiwania (tam będziemy wchodzić po kliknięciu "szukaj")
