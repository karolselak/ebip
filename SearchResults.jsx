SearchResults = React.createClass({
    //TODO: sparametryzowac wyszukiwanie do danej instytucji
    mixins: [ReactMeteorData],
    getMeteorData() {
        var temp= this.props.phrase
    	var ins = Institutions.find({$or: [{name:  {$regex: temp,$options:"i"}  },{email: {$regex: temp,$options:"i"} },{address: {$regex: temp,$options:"i"} }]}).fetch();
    	var art= Articles.find({$or: [{tags: temp},{content: {$regex: temp,$options:"i"}},{ title: {$regex: temp,$options:"i"}}]}).fetch();
    	return {
            articles: art,
    		institutions: ins
    	};
    },
    render() {
        return  <div className='container' id='globalSearch'>
	        <div className="row">
	         <div className="col-md-12" id='centerTopSection'>
						      <p><h2>Wyniki wyszukiwania </h2></p>
						      <div className="row">
    						        <p>W instytucjach</p>
    						        {this.printInstitutions()}
						      </div>
						      <div className="row">
                    <p>W Artykułach</p>
                    {this.printArticles()}
                  </div>
					  </div>
				  </div>
		    </div>
    },
    printInstitutions(){
    	return this.data.institutions.map((el)=>{
            if(el) {
        		return <div id={el._id}><a href={"/i/"+el.name}>{el.name}</a></div>
            }
    	})

    },
    printArticles(){
        var ins2;
        return this.data.articles.map((el2)=>{
            ins2 = Institutions.findOne({_id: el2.institution_id});
            if (el2 && ins2) {
                return <div>
                  <br />
                  <div className="row searchBackground">
                    <a href={"/i/"+ins2.name+"/article/"+el2._id} className="searchLink">
                    <div className="col-md-12" id={el2._id}>
                      <div className="row">
                        <div className="col-md-4 col-md-offset-1 serachHeading">
                          {el2.title}
                        </div>
                      </div>
                      <div className="row " >
                        <div className="col-md-12 ShortArticleView ">
                          <div dangerouslySetInnerHTML={{__html: el2.content}}></div>
                        </div>
                      </div>
                    </div>
                    </a>
                  </div>
                </div>
            }
        })
    }
});
