MainLayout = React.createClass({
    render() {
        return (
        <main>
        <body>
          <div className="container">

  	        <header>
  		        <div className="col-md-10">
  		          <a href="/" id="projectTitleLink">
  			          <h2><p id="projectTitle">Projekt eBIP</p></h2>
                </a>
              </div>
              <div className="col-md-2">
                <span id="AccountsUIWrapper"><AccountsUIWrapper /></span>
              </div>
  	        </header>

              <div className="row">
                <div className="col-md-12 h-scroll">
                  {this.props.content}
                </div>
              </div>

            <footer>
              <h5 id="footerText">
                <p className ="text-center">Projekt zrealizowany przez studentów Politechniki Wrocławskiej</p>
                <p className="text-center">Wrocław 2016</p>
              </h5>
            </footer>
          </div>

        </body>
        </main>);
    }
});
