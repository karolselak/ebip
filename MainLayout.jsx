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
          <div class="col-md-2 col-md-push-2" id="signin">
            <span id="AccountsUIWrapper"><AccountsUIWrapper /></span>
          </div>
					</div>
				</div>
        <div class="row">
          <div class="col-md-4">
            {/*cos nie dziala... moze trzeba jakos podlinkowac zrodlo?*/}
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
          </div>
          <div class="col-md-10" id="browser">
            <span class="wyszukiwarka">WYSZUKIWARKA</span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10" id="homepage">
              <Homepage />
          </div>
        </div>
			</div>
		</body>
        {/*TODO Martin: - wstawienie interfejsu wyszukiwarki*/}
        {/*this.props.content*/}
    </main>);
  }
});
