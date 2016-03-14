MainLayout = React.createClass({
  render() {
    return (
    <main>
		<body>
			<div className="container">
				<div className="row">
					<div className="col-md-10" id="topStrip">
					    <a href="/">
						    <img src="img/LOGO.png" className="img-responsive" id="logo-img" />
                        </a>
                        <div className="col-md-2 col-md-push-2" id="signin">
                            <span id="AccountsUIWrapper"><AccountsUIWrapper /></span>
                        </div>
				    </div>
				</div>
                <div className="row">
                  <div className="col-md-4">
                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                  </div>
                  <div className="col-md-10" id="browser">
                    <span className="wyszukiwarka">WYSZUKIWARKA</span>
                  </div>
                </div>
                {this.props.content}
			</div>
		</body>
    </main>);
  }
});
