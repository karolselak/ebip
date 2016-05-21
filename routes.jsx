//strona główna:
FlowRouter.route('/', {
    action() {
        ReactLayout.render(MainLayout, {content: <Homepage />});
    }
});
//strona instytucji:
FlowRouter.route('/i/:institution', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//widok konkretnego artykułu:
FlowRouter.route('/i/:institution/article/:article', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//widok treści filtrowanej według tagów:
FlowRouter.route('/i/:institution/tags/:tags', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//wyszukiwanie globalne:
FlowRouter.route('/search/:phrase', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <SearchResults {...params}/>});
    }
});
//wyszukiwanie lokalne (w ramach danej instytucji):
FlowRouter.route('/i/:institution/search/:phrase', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params}/>});
    }
});
//informacje ogólne nt. instytucji:
FlowRouter.route('/i/:institution/about', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Institution {...params} is_about={true} />});
    }
});
//lista zdefiniowanych typów mikrodanych
FlowRouter.route('/dictionary', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Dictionary />});
    }
});
//podgląd typu mikrodanych
FlowRouter.route('/dictionary/:itemname', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <ItemType {...params} />});
    }
});
//Uprawnienia użytkownikow
FlowRouter.route('/permissions', {
    action(params) {
        ReactLayout.render(MainLayout, {content: <Permissions />});
    }
});

/*

	        var xhttp = new XMLHttpRequest();

	        xhttp.onreadystatechange = function () {
	            if (xhttp.readyState == 4 && xhttp.status == 200) {
	                var Token = xhttp.responseText;
	                console.log(xhttp.responseText);
	                if (Token) {
	                    localStorage.setItem('token', Token);
	                    this.forceUpdate();
	                }
	            }
	        };
	        xhttp.open('POST', 'signIn?email=' + email + '&password=' + password, true);
	        xhttp.send();
	    },
*/
if (Meteor.isServer) {
    var postRoutes = Picker.filter(function(req, res) {
        return req.method == "POST";
    });
    var getRoutes = Picker.filter(function(req, res) {
        return req.method == "GET" && req.headers.accept == "application/json";
    });
    getRoutes.route('/dictionary/:itemname', function(params, req, res, next) {
        var itemType = ItemTypes.findOne({name: params.itemname})
        if (!itemType) {
            itemType = PropertyTypes.findOne({name: params.itemname})
        } else {
            extendItemType(itemType);
        }
        res.end(JSON.stringifyCircular(itemType));
    });
    getRoutes.route('/restQuery/:collection/:jsonQuery', function(params, req, res, next) {
        var result = Mongo.Collection.get(params.collection).find(JSON.parse(decodeURI(params.jsonQuery))).fetch();
        var type = WhatIs[params.collection]; //tłumaczymy nazwę kolekcji na nazwę klasy w słowniku
        result = result.map((el)=>{
            delete el._id;
            el['@context'] = rdfContext;
            el['@type'] = type;
            return el;
        })

        /*HTTP.get(url, {
            headers: {
                'accept': 'application/json'
            }
        }, function(err, res2) {
            res2.content

            console.log(JSON.parse(res2.content));
        });*/
        res.end(JSON.stringifyCircular(result));
    });
}
