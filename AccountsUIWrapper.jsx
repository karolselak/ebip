AccountsUIWrapper = React.createClass({
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.renderWithData(Template.loginButtons, {align: "right"},
      ReactDOM.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  },
  render() {
    // Just render a placeholder container that will be filled in
    return <div ><span ref="container" /></div>;
  },
  /*propTypes : {
      align: React.propTypes.string
  },
  defaultProps : {
      align: 'right'
  }*/
});
/*AccountsUIWrapper.propTypes = {
    align: React.propTypes.string
};
AccountsUIWrapper.defaultProps = {align: 'right'};
*/
