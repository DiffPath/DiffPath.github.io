		var tabbar1 = {
      id: "tabs1",
		  view: "tabbar",
      type: "bottom",
		  selected: 'listView',
		  multiview: true,
      tabMinWidth: 150,
		  options: [{
		    value: 'Diseases',
		    id: 'listView'
		  }, {
		    value: 'Disease Info      ',
		    id: 'formView',
		    close: true
		  }, {
		    value: 'About',
		    id: 'aboutView',
		    close: true
		  }]
		};
    
    	var tabbar2 = {
      id: "tabs2",
		  view: "tabbar",
      type: "bottom",
		  selected: 'listView',
		  multiview: true,
      tabMinWidth: 150,
		  options: [{
		    value: 'Edit Data',
		    id: 'editView'
		  }, {
		    value: 'DiffPath',
		    id: 'diffView',
		  }]
		};

		var data1 = {
		  animate: true,
      id: "views",
		  cells: [{
		    id: "listView",
		    view: "datatable",
		    select: true,
        navigation: true,
		    editable: true,
		    editaction: "custom",
        on:{
							onItemDblClick:open_new_tab
				},
		    columns: [{
		      id: "rank",
		      header: "",
		      width: 50
		    }, {
		      id: "title",
		      header: "Film title",
		      editor: "text",
		      sort: "string",
		      fillspace: true
		    }, {
		      id: "year",
		      header: "Released",
		      fillspace: true
		    }, {
		      id: "votes",
		      header: "Votes",
		      fillspace: true
		    }],
		    data: [{
		      id: 1,
		      title: "Glioblastoma Multiforme",
		      year: 1994,
		      votes: 678790,
		      rank: 1
		    }, {
		      id: 2,
		      title: "Astrocytoma",
		      year: 1972,
		      votes: 511495,
		      rank: 2
		    }]
		  }, {
		    id: "formView",
		    view: "list",
		    template: "#rank#. #title# <div style='padding-left:18px'> Year:#year#, votes:#votes# </div>",
		    type: {
		      height: 60
		    },
        data: big_film_set,
		    select: true,        


        
		  }, {
		    id: "aboutView",
		    template: "About the app"
		  }]
		};
    
    var form = {
				view:"form", id:"form1", scroll:false, maxWidth:400, minWidth:200, height:600,
				elements:[
					{ view:"text", name:"title", label:"Disease" },
					{ view:"text", name:"year", label:"Text A" },
					{ view:"text", name:"votes", label:"Text B" },
					{ view:"button", value:"Save", click:'$$("form1").save()' },
          { view:"button", value:"Add New"}
				]
			};

		dtable = webix.ui({
		  container: "box",
      type:"border",
      rows: [
      {view:"template",type:"header",template:"DiffPath v. 0.1"},   
      {cols: [
      {rows: [tabbar2,form]},
      { view:"resizer"},{
		  type: "clean",
		  rows: [
		    tabbar1,
		    data1
		  ]}
      ]}]      
		});
    
    $$('form1').bind('listView')

		webix.event(window, "resize", function() {
		  dtable.adjust();
		});
    
    webix.UIManager.addHotKey("enter", function(view){
				var pos = view.getSelectedId();
				view.edit(pos);
			}, dtable);


		function open_new_tab(id) {
		  var item = $$('listView').getItem(id);
		  //add tab
		    $$("views").addView({
		      view: "template",
		      id: item.id,
          template: "Title: " + item.title + "<br>Year: " + item.year + "<br>Votes: " + item.votes
		    });
		    $$("tabs1").addOption({id:item.id, value:item.title, close:true},true);
		  //or show if already added
		}