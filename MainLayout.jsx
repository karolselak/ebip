MainLayout = React.createClass({
  render() {
    return (
    <main>
		<body>
			<div className="container">
				<div className="row" id="topStrip">
					<div className="col-md-10">
					    <a href="/">
						    <img src="img/LOGO.png" className="img-responsive" id="logo-img" />
              </a>
          </div>
          <div className="col-md-2">
            <span id="AccountsUIWrapper"><AccountsUIWrapper /></span>
          </div>
				</div>
        <div className="row">
          <div classnae="col-md-12">
            {this.props.content}
          </div>
        </div>
			</div>
		</body>
    </main>);
  }
});
