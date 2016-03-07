MainLayout = React.createClass({
  render() {
    return (
    <main>
        {/*TODO Hubert: - zrobienie paska górnego z logiem prowadzącym do '/' */}
        {/*TODO Martin: - wstawienie interfejsu wyszukiwarki*/}
        EBIP - layout główny (logo, linki, etc.)
        <AccountsUIWrapper />
        {this.props.content}
    </main>);
  }
});
