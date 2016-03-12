MainLayout = React.createClass({
  render() {
    return (
    <main>
		<body>
			<div class="container">
				<div class="row">
					<div class="col-md-10" id="topStrip">
					<a href="localhost:3000">
						<img src="img/LOGO.png" class="img-responsive" id="logo-img" />
					</a>
					</div>
				</div>
			</div>
		</body>
		{/*TODO Hubert: - zrobienie paska górnego z logiem prowadzącym do '/' */}
        {/*TODO Martin: - wstawienie interfejsu wyszukiwarki*/}
        <AccountsUIWrapper />
        {this.props.content}
    </main>);
  }
});
