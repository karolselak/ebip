FlowRouter.route('/', {
    action() {
        ReactLayout.render(MainLayout, {content: <Homepage />});
    }
});
FlowRouter.route('/admin', {
    action() {
        ReactLayout.render(MainLayout, {content: <Management />});
    }
});
