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
        <div class="row">
          <div class="col-md-10">
            <p id="AccountsUIWrapper"><AccountsUIWrapper /></p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
              <Homepage />
          </div>
        </div>
			</div>
		</body>
		{/*TODO Hubert: - zrobienie paska górnego z logiem prowadzącym do '/' */}
        {/*TODO Martin: - wstawienie interfejsu wyszukiwarki*/}
        {/*this.props.content*/}
    </main>);
  }
});
