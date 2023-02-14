
var gridOptions = {
		  /*selection: {
			    background: '#4daaf9',
			    color : "#ffffff",
			    //border: '#004082'
			  },*/
			  /*scrollbar: {
			    background: '#323232',
			    thumb: '#323232',
			    active: '#c1c1c1'
			  },*/
			  row: {
			    even: {
			      //background: '#aaaaaa'
			    },
			   /* hover: {
			      background: '#ccc'
			    }*/
			  },
			  cell: {
			    normal: {
			      color : "#ffffff",
			      background: '#323232',
			      //border: '#ffffff',
			     // showVerticalBorder: true
			    },
			    header: {
			      color : "#ffffff",
			      background: '#323232',
			      //border: '#ffffff',
			      //showVerticalBorder: true
			    },
			    rowHeader: {
			    	color : "#ffffff",
			      //border: '#ffffff',
			      //showVerticalBorder: true
			    },
			    editable: {
			      background: '#323232'
			    },
			    selectedHeader: {
			      background: '#d8d8d8'
			    },
			    focused: {
			     //border: '#418ed4'
			    },
			    disabled: {
			      text: '#b0b0b0'
			    }
			  }
			}
			            

var resultGrid = {
    grid : function(displayDivTagID, configData) {
        var result = new tui.Grid({
            el : document.getElementById(displayDivTagID),
            data: configData.data,
            width: configData.width,
            bodyHeight: configData.height-40,
            scrollX: false,
            scrollY: false,
            rowHeight: 30,
            //minBodyHeight : 50,
            columns: configData.columns,
            /*applyTheme : {
            	'default': gridOptions
            },*/
            columnOptions: {
                minWidth : 80,
                //height:25,
                resizable: true
            }
        })
		return result;
    }
}
//tui.Grid.applyTheme('default', options);


			            