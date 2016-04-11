SearchResults = React.createClass({
    //TODO Martin: sprawienie, aby w tej klasie renderowały się globalne wyniki wyszukiwania
    mixins: [ReactMeteorData],
    getMeteorData() {
    	var ins = Institutions.find({$or: [{name: "ala"},{email:"ala"},{address: "ala"}]}).fetch();
    	var art= Articles.find({$or: [{tags: "ala"},{content: "ala"},{ title: "ala"}]}).fetch();
    	return {
            articles :art,
    		institutions: ins
    	};
    },
    render() {
        return  <div className='container' id='globalSearch'>
	        <div className="row">
	            <div className="col-md-12">
	                <div id='centerTopSection'>
						<p><h2>Wyniki wyszukiwania </h2></p>
						<div>
    						<p>W instytucjach</p>
    						{this.printInstitutions()}
						</div>
						<div>
                            <p>W Artykułach</p>
                            {this.printArticles()}
                        </div>
					</div>
				</div>
			</div>
		</div>
    },
    printInstitutions(){
    	return this.data.institutions.map((el)=>{
    		return <div id={el._id}><a href={"/i/"+el.name}>{el.name}</a></div>
    	})
    	
    },
    printArticles(){
        var ins2;
        return this.data.articles.map((el2)=>{
            ins2 = Institutions.findOne({_id: el2.institution_id});
            return <div id={el2._id}>
                <a href={"/i/"+ins2.name+"/article/"+el2._id} >{el2.title}</a>
            </div>
        }) 
    }
});
