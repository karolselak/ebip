MainLayout = React.createClass({
  render() {
    return (
    <main>
        EBIP - layout główny (logo, linki, etc.)
        <AccountsUIWrapper />
        {this.props.content}
    </main>);
  }
});
